'use strict';

var _appendChild = require('yo-yoify/lib/appendChild');

module.exports = function (props) {
  var _h, _span, _div;

  return _div = document.createElement('div'), _appendChild(_div, [' ', (_h = document.createElement('h1'), _h.textContent = 'Please allow access to your camera', _h), ' ', (_span = document.createElement('span'), _span.textContent = 'You have been prompted to allow camera access from this site. In order to take pictures with your camera you must approve this request.', _span), ' ']), _div;
};
//# sourceMappingURL=PermissionsScreen.js.map