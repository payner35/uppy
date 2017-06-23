'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? require('es6-promise').Promise : Promise;

var Plugin = require('../Plugin');
var Client = require('./Client');
var StatusSocket = require('./Socket');

/**
 * Upload files to Transloadit using Tus.
 */
module.exports = function (_Plugin) {
  _inherits(Transloadit, _Plugin);

  function Transloadit(core, opts) {
    _classCallCheck(this, Transloadit);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, core, opts));

    _this.type = 'uploader';
    _this.id = 'Transloadit';
    _this.title = 'Transloadit';

    var defaultLocale = {
      strings: {
        creatingAssembly: 'Preparing upload...',
        creatingAssemblyFailed: 'Transloadit: Could not create assembly',
        encoding: 'Encoding...'
      }
    };

    var defaultOptions = {
      waitForEncoding: false,
      waitForMetadata: false,
      signature: null,
      params: null,
      fields: {},
      locale: defaultLocale
    };

    _this.opts = _extends({}, defaultOptions, opts);

    _this.locale = _extends({}, defaultLocale, _this.opts.locale);
    _this.locale.strings = _extends({}, defaultLocale.strings, _this.opts.locale.strings);

    _this.prepareUpload = _this.prepareUpload.bind(_this);
    _this.afterUpload = _this.afterUpload.bind(_this);

    if (!_this.opts.params) {
      throw new Error('Transloadit: The `params` option is required.');
    }

    var params = _this.opts.params;
    if (typeof params === 'string') {
      try {
        params = JSON.parse(params);
      } catch (err) {
        // Tell the user that this is not an Uppy bug!
        err.message = 'Transloadit: The `params` option is a malformed JSON string: ' + err.message;
        throw err;
      }
    }

    if (!params.auth || !params.auth.key) {
      throw new Error('Transloadit: The `params.auth.key` option is required. ' + 'You can find your Transloadit API key at https://transloadit.com/accounts/credentials.');
    }

    _this.client = new Client();
    return _this;
  }

  Transloadit.prototype.createAssembly = function createAssembly() {
    var _this2 = this;

    this.core.log('Transloadit: create assembly');

    var files = this.core.state.files;
    var expectedFiles = Object.keys(files).reduce(function (count, fileID) {
      if (!files[fileID].progress.uploadStarted || files[fileID].isRemote) {
        return count + 1;
      }
      return count;
    }, 0);

    return this.client.createAssembly({
      params: this.opts.params,
      fields: this.opts.fields,
      expectedFiles: expectedFiles,
      signature: this.opts.signature
    }).then(function (assembly) {
      _this2.updateState({ assembly: assembly });

      function attachAssemblyMetadata(file, assembly) {
        // Attach meta parameters for the Tus plugin. See:
        // https://github.com/tus/tusd/wiki/Uploading-to-Transloadit-using-tus#uploading-using-tus
        // TODO Should this `meta` be moved to a `tus.meta` property instead?
        // If the MetaData plugin can add eg. resize parameters, it doesn't
        // make much sense to set those as upload-metadata for tus.
        var meta = _extends({}, file.meta, {
          assembly_url: assembly.assembly_url,
          filename: file.name,
          fieldname: 'file'
        });
        // Add assembly-specific Tus endpoint.
        var tus = _extends({}, file.tus, {
          endpoint: assembly.tus_url
        });
        return _extends({}, file, { meta: meta, tus: tus });
      }

      var filesObj = _this2.core.state.files;
      var files = {};
      Object.keys(filesObj).forEach(function (id) {
        files[id] = attachAssemblyMetadata(filesObj[id], assembly);
      });

      _this2.core.setState({ files: files });

      return _this2.connectSocket();
    }).then(function () {
      _this2.core.log('Transloadit: Created assembly');
    }).catch(function (err) {
      _this2.core.emit('informer', _this2.opts.locale.strings.creatingAssemblyFailed, 'error', 0);

      // Reject the promise.
      throw err;
    });
  };

  Transloadit.prototype.shouldWait = function shouldWait() {
    return this.opts.waitForEncoding || this.opts.waitForMetadata;
  };

  Transloadit.prototype.findFile = function findFile(uploadedFile) {
    var files = this.core.state.files;
    for (var id in files) {
      if (!files.hasOwnProperty(id)) {
        continue;
      }
      if (files[id].uploadURL === uploadedFile.tus_upload_url) {
        return files[id];
      }
    }
  };

  Transloadit.prototype.onFileUploadComplete = function onFileUploadComplete(uploadedFile) {
    var _extends2;

    var file = this.findFile(uploadedFile);
    this.updateState({
      files: _extends({}, this.state.files, (_extends2 = {}, _extends2[uploadedFile.id] = {
        id: file.id,
        uploadedFile: uploadedFile
      }, _extends2))
    });
    this.core.bus.emit('transloadit:upload', uploadedFile);
  };

  Transloadit.prototype.onResult = function onResult(stepName, result) {
    var file = this.state.files[result.original_id];
    // The `file` may not exist if an import robot was used instead of a file upload.
    result.localId = file ? file.id : null;

    this.updateState({
      results: this.state.results.concat(result)
    });
    this.core.bus.emit('transloadit:result', stepName, result);
  };

  Transloadit.prototype.connectSocket = function connectSocket() {
    var _this3 = this;

    this.socket = new StatusSocket(this.state.assembly.websocket_url, this.state.assembly);

    this.socket.on('upload', this.onFileUploadComplete.bind(this));

    if (this.opts.waitForEncoding) {
      this.socket.on('result', this.onResult.bind(this));
    }

    this.assemblyReady = new _Promise(function (resolve, reject) {
      if (_this3.opts.waitForEncoding) {
        _this3.socket.on('finished', resolve);
      } else if (_this3.opts.waitForMetadata) {
        _this3.socket.on('metadata', resolve);
      }
      _this3.socket.on('error', reject);
    });

    return new _Promise(function (resolve, reject) {
      _this3.socket.on('connect', resolve);
      _this3.socket.on('error', reject);
    }).then(function () {
      _this3.core.log('Transloadit: Socket is ready');
    });
  };

  Transloadit.prototype.prepareUpload = function prepareUpload() {
    var _this4 = this;

    this.core.emit('informer', this.opts.locale.strings.creatingAssembly, 'info', 0);
    return this.createAssembly().then(function () {
      _this4.core.emit('informer:hide');
    });
  };

  Transloadit.prototype.afterUpload = function afterUpload() {
    var _this5 = this;

    // If we don't have to wait for encoding metadata or results, we can close
    // the socket immediately and finish the upload.
    if (!this.shouldWait()) {
      this.socket.close();
      return;
    }

    this.core.emit('informer', this.opts.locale.strings.encoding, 'info', 0);
    return this.assemblyReady.then(function () {
      return _this5.client.getAssemblyStatus(_this5.state.assembly.assembly_ssl_url);
    }).then(function (assembly) {
      _this5.updateState({ assembly: assembly });

      // TODO set the `file.uploadURL` to a result?
      // We will probably need an option here so the plugin user can tell us
      // which result to pick…?

      _this5.core.emit('informer:hide');
    }).catch(function (err) {
      // Always hide the Informer
      _this5.core.emit('informer:hide');

      throw err;
    });
  };

  Transloadit.prototype.install = function install() {
    this.core.addPreProcessor(this.prepareUpload);
    this.core.addPostProcessor(this.afterUpload);

    this.updateState({
      assembly: null,
      files: {},
      results: []
    });
  };

  Transloadit.prototype.uninstall = function uninstall() {
    this.core.removePreProcessor(this.prepareUpload);
    this.core.removePostProcessor(this.afterUpload);
  };

  Transloadit.prototype.updateState = function updateState(newState) {
    var transloadit = _extends({}, this.state, newState);

    this.core.setState({ transloadit: transloadit });
  };

  _createClass(Transloadit, [{
    key: 'state',
    get: function get() {
      return this.core.state.transloadit || {};
    }
  }]);

  return Transloadit;
}(Plugin);
//# sourceMappingURL=index.js.map