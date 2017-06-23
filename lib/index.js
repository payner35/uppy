'use strict';

var Core = require('./core/index.js');

// Parent
var Plugin = require('./plugins/Plugin');

// Orchestrators
var Dashboard = require('./plugins/Dashboard/index.js');

// Acquirers
var Dummy = require('./plugins/Dummy');
var DragDrop = require('./plugins/DragDrop/index.js');
var FileInput = require('./plugins/FileInput.js');
var GoogleDrive = require('./plugins/GoogleDrive/index.js');
var Dropbox = require('./plugins/Dropbox/index.js');
var Webcam = require('./plugins/Webcam/index.js');

// Progressindicators
var ProgressBar = require('./plugins/ProgressBar.js');
var Informer = require('./plugins/Informer.js');

// Modifiers
var MetaData = require('./plugins/MetaData.js');

// Uploaders
var Tus10 = require('./plugins/Tus10');
var Multipart = require('./plugins/Multipart');
var Transloadit = require('./plugins/Transloadit');

module.exports = {
  Core: Core,
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
  Transloadit: Transloadit,
  Dashboard: Dashboard,
  MetaData: MetaData,
  Webcam: Webcam
};
//# sourceMappingURL=index.js.map