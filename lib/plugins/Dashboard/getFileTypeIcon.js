'use strict';

var _require = require('./icons'),
    iconText = _require.iconText,
    iconFile = _require.iconFile,
    iconAudio = _require.iconAudio,
    iconVideo = _require.iconVideo,
    iconPDF = _require.iconPDF;

module.exports = function getIconByMime(fileTypeGeneral, fileTypeSpecific) {
  if (fileTypeGeneral === 'text') {
    return {
      color: '#000',
      icon: iconText()
    };
  }

  if (fileTypeGeneral === 'audio') {
    return {
      color: '#1abc9c',
      icon: iconAudio()
    };
  }

  if (fileTypeGeneral === 'video') {
    return {
      color: '#2980b9',
      icon: iconVideo()
    };
  }

  if (fileTypeGeneral === 'application' && fileTypeSpecific === 'pdf') {
    return {
      color: '#e74c3c',
      icon: iconPDF()
    };
  }

  return {
    color: '#000',
    icon: iconFile()
  };
};
//# sourceMappingURL=getFileTypeIcon.js.map