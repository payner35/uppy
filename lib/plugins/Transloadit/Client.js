'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Barebones HTTP API client for Transloadit.
 */
module.exports = function () {
  function Client() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Client);

    this.apiUrl = 'https://api2.transloadit.com';
    this.opts = opts;
  }

  /**
   * Create a new assembly.
   *
   * @param {object} options
   */


  Client.prototype.createAssembly = function createAssembly(_ref) {
    var templateId = _ref.templateId,
        params = _ref.params,
        fields = _ref.fields,
        signature = _ref.signature,
        expectedFiles = _ref.expectedFiles;

    var data = new FormData();
    data.append('params', typeof params === 'string' ? params : JSON.stringify(params));
    if (signature) {
      data.append('signature', signature);
    }

    data.append('fields', JSON.stringify(fields));
    data.append('tus_num_expected_upload_files', expectedFiles);

    return fetch(this.apiUrl + '/assemblies', {
      method: 'post',
      body: data
    }).then(function (response) {
      return response.json();
    }).then(function (assembly) {
      if (assembly.error) {
        var error = new Error(assembly.message);
        error.code = assembly.error;
        error.status = assembly;
        throw error;
      }

      return assembly;
    });
  };

  /**
   * Get the current status for an assembly.
   *
   * @param {string} url The status endpoint of the assembly.
   */


  Client.prototype.getAssemblyStatus = function getAssemblyStatus(url) {
    return fetch(url).then(function (response) {
      return response.json();
    });
  };

  return Client;
}();
//# sourceMappingURL=Client.js.map