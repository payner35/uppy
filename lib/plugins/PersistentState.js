'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plugin = require('./Plugin');
// import deepDiff from 'deep-diff'

/**
 * Persistent State
 *
 * Helps debug Uppy: loads saved state from localStorage, so when you restart the page,
 * your state is right where you left off. If something goes wrong, clear uppyState
 * in your localStorage, using the devTools
 *
 */
module.exports = function (_Plugin) {
  _inherits(PersistentState, _Plugin);

  function PersistentState(core, opts) {
    _classCallCheck(this, PersistentState);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, core, opts));

    _this.type = 'debugger';
    _this.id = 'Persistent State';
    _this.title = 'PersistentState';

    // set default options
    var defaultOptions = {};

    // merge default options with the ones set by user
    _this.opts = _extends({}, defaultOptions, opts);
    return _this;
  }

  PersistentState.prototype.loadSavedState = function loadSavedState() {
    var savedState = localStorage.getItem('uppyState');

    if (savedState) {
      this.core.state = JSON.parse(savedState);
    }
  };

  PersistentState.prototype.install = function install() {
    var _this2 = this;

    this.loadSavedState();

    window.onbeforeunload = function (ev) {
      localStorage.setItem('uppyState', JSON.stringify(_this2.core.state));
    };

    // this.core.on('core:state-update', (prev, state, patch) => {
    //   localStorage.setItem('uppyState', JSON.stringify(state))
    // })
  };

  return PersistentState;
}(Plugin);
//# sourceMappingURL=PersistentState.js.map