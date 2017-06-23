'use strict';

// Parent
var Plugin = require('./Plugin');

// Orchestrators
var Dashboard = require('./Dashboard/index.js');

// Acquirers
var Dummy = require('./Dummy');
var DragDrop = require('./DragDrop/index.js');
var FileInput = require('./FileInput');
var GoogleDrive = require('./GoogleDrive/index.js');
var Dropbox = require('./Dropbox/index.js');
var Webcam = require('./Webcam/index.js');

// Progressindicators
var ProgressBar = require('./ProgressBar.js');
var Informer = require('./Informer.js');

// Uploaders
var Tus10 = require('./Tus10');
var Multipart = require('./Multipart');

// Presenters
// import Present from './Present'

// Presetters
// import TransloaditBasic from './TransloaditBasic'

module.exports = {
  Plugin: Plugin,
  Dummy: Dummy,
  ProgressBar: ProgressBar,
  Informer: Informer,
  DragDrop: DragDrop,
  GoogleDrive: GoogleDrive,
  Dropbox: Dropbox,
  FileInput: FileInput,
  Tus10: Tus10,
  Multipart: Multipart,
  // TransloaditBasic,
  Dashboard: Dashboard,
  Webcam: Webcam
};
//# sourceMappingURL=_index.js.map