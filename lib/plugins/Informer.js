'use strict';

var _appendChild = require('yo-yoify/lib/appendChild');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plugin = require('./Plugin');


/**
 * Informer
 * Shows rad message bubbles
 * used like this: `bus.emit('informer', 'hello world', 'info', 5000)`
 * or for errors: `bus.emit('informer', 'Error uploading img.jpg', 'error', 5000)`
 *
 */
module.exports = function (_Plugin) {
  _inherits(Informer, _Plugin);

  function Informer(core, opts) {
    _classCallCheck(this, Informer);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, core, opts));

    _this.type = 'progressindicator';
    _this.id = 'Informer';
    _this.title = 'Informer';
    _this.timeoutID = undefined;

    // set default options
    var defaultOptions = {
      typeColors: {
        info: {
          text: '#fff',
          bg: '#000'
        },
        warning: {
          text: '#fff',
          bg: '#F6A623'
        },
        error: {
          text: '#fff',
          bg: '#e74c3c'
        },
        success: {
          text: '#fff',
          bg: '#7ac824'
        }
      }
    };

    // merge default options with the ones set by user
    _this.opts = _extends({}, defaultOptions, opts);

    _this.render = _this.render.bind(_this);
    return _this;
  }

  Informer.prototype.showInformer = function showInformer(msg, type, duration) {
    var _this2 = this;

    this.core.setState({
      informer: {
        isHidden: false,
        type: type,
        msg: msg
      }
    });

    window.clearTimeout(this.timeoutID);
    if (duration === 0) {
      this.timeoutID = undefined;
      return;
    }

    // hide the informer after `duration` milliseconds
    this.timeoutID = setTimeout(function () {
      var newInformer = _extends({}, _this2.core.getState().informer, {
        isHidden: true
      });
      _this2.core.setState({
        informer: newInformer
      });
    }, duration);
  };

  Informer.prototype.hideInformer = function hideInformer() {
    var newInformer = _extends({}, this.core.getState().informer, {
      isHidden: true
    });
    this.core.setState({
      informer: newInformer
    });
  };

  Informer.prototype.render = function render(state) {
    var _p, _uppy;

    var isHidden = state.informer.isHidden;
    var msg = state.informer.msg;
    var type = state.informer.type || 'info';
    var style = 'background-color: ' + this.opts.typeColors[type].bg + '; color: ' + this.opts.typeColors[type].text + ';';

    // @TODO add aria-live for screen-readers
    return _uppy = document.createElement('div'), _uppy.setAttribute('style', '' + String(style) + ''), _uppy.setAttribute('aria-hidden', '' + String(isHidden) + ''), _uppy.setAttribute('class', 'Uppy UppyTheme--default UppyInformer'), _appendChild(_uppy, [' ', (_p = document.createElement('p'), _appendChild(_p, [msg]), _p), ' ']), _uppy;
  };

  Informer.prototype.install = function install() {
    var _this3 = this;

    // Set default state for Google Drive
    this.core.setState({
      informer: {
        isHidden: true,
        type: '',
        msg: ''
      }
    });

    this.core.on('informer', function (msg, type, duration) {
      _this3.showInformer(msg, type, duration);
    });

    this.core.on('informer:hide', function () {
      _this3.hideInformer();
    });

    var target = this.opts.target;
    var plugin = this;
    this.target = this.mount(target, plugin);
  };

  Informer.prototype.uninstall = function uninstall() {
    this.unmount();
  };

  return Informer;
}(Plugin);
//# sourceMappingURL=Informer.js.map