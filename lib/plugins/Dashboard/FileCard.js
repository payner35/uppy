'use strict';

var _appendChild = require('yo-yoify/lib/appendChild');

var getFileTypeIcon = require('./getFileTypeIcon');

var _require = require('./icons'),
    checkIcon = _require.checkIcon;

// function getIconByMime (fileTypeGeneral) {
//   switch (fileTypeGeneral) {
//     case 'text':
//       return iconText()
//     case 'audio':
//       return iconAudio()
//     default:
//       return iconFile()
//   }
// }

module.exports = function fileCard(props) {
  var _uppyDashboardContentTitleFile, _uppyDashboardContentTitle, _uppyDashboardContentBack, _uppyDashboardContentBar, _uppyButtonCircular, _uppyDashboardActions, _uppyDashboardFileCard, _uppyDashboardFileCardPreview, _uppyDashboardFileCardLabel2, _uppyDashboardFileCardInput2, _uppyDashboardFileCardFieldset2, _uppyDashboardFileCardInfo, _uppyDashboardFileCardInner, _img, _uppyDashboardItemPreviewIcon;

  var file = props.fileCardFor ? props.files[props.fileCardFor] : false;
  var meta = {};

  function tempStoreMeta(ev) {
    var value = ev.target.value;
    var name = ev.target.attributes.name.value;
    meta[name] = value;
  }

  function renderMetaFields(file) {
    var metaFields = props.metaFields || [];
    return metaFields.map(function (field) {
      var _uppyDashboardFileCardLabel, _uppyDashboardFileCardInput, _uppyDashboardFileCardFieldset;

      return _uppyDashboardFileCardFieldset = document.createElement('fieldset'), _uppyDashboardFileCardFieldset.setAttribute('class', 'UppyDashboardFileCard-fieldset'), _appendChild(_uppyDashboardFileCardFieldset, [' ', (_uppyDashboardFileCardLabel = document.createElement('label'), _uppyDashboardFileCardLabel.setAttribute('class', 'UppyDashboardFileCard-label'), _appendChild(_uppyDashboardFileCardLabel, [field.name]), _uppyDashboardFileCardLabel), ' ', (_uppyDashboardFileCardInput = document.createElement('input'), _uppyDashboardFileCardInput.setAttribute('name', '' + String(field.id) + ''), _uppyDashboardFileCardInput.setAttribute('type', 'text'), _uppyDashboardFileCardInput.setAttribute('value', '' + String(file.meta[field.id]) + ''), _uppyDashboardFileCardInput.setAttribute('placeholder', '' + String(field.placeholder || '') + ''), _uppyDashboardFileCardInput.onkeyup = tempStoreMeta, _uppyDashboardFileCardInput.setAttribute('class', 'UppyDashboardFileCard-input'), _uppyDashboardFileCardInput)]), _uppyDashboardFileCardFieldset;
    });
  }

  return _uppyDashboardFileCard = document.createElement('div'), _uppyDashboardFileCard.setAttribute('aria-hidden', '' + String(!props.fileCardFor) + ''), _uppyDashboardFileCard.setAttribute('class', 'UppyDashboardFileCard'), _appendChild(_uppyDashboardFileCard, [' ', (_uppyDashboardContentBar = document.createElement('div'), _uppyDashboardContentBar.setAttribute('class', 'UppyDashboardContent-bar'), _appendChild(_uppyDashboardContentBar, [' ', (_uppyDashboardContentTitle = document.createElement('h2'), _uppyDashboardContentTitle.setAttribute('class', 'UppyDashboardContent-title'), _appendChild(_uppyDashboardContentTitle, ['Editing ', (_uppyDashboardContentTitleFile = document.createElement('span'), _uppyDashboardContentTitleFile.setAttribute('class', 'UppyDashboardContent-titleFile'), _appendChild(_uppyDashboardContentTitleFile, [file.meta ? file.meta.name : file.name]), _uppyDashboardContentTitleFile)]), _uppyDashboardContentTitle), ' ', (_uppyDashboardContentBack = document.createElement('button'), _uppyDashboardContentBack.setAttribute('title', 'Finish editing file'), _uppyDashboardContentBack.onclick = function () {
    return props.done(meta, file.id);
  }, _uppyDashboardContentBack.setAttribute('class', 'UppyDashboardContent-back'), _uppyDashboardContentBack.textContent = 'Done', _uppyDashboardContentBack), ' ']), _uppyDashboardContentBar), ' ', props.fileCardFor ? (_uppyDashboardFileCardInner = document.createElement('div'), _uppyDashboardFileCardInner.setAttribute('class', 'UppyDashboardFileCard-inner'), _appendChild(_uppyDashboardFileCardInner, [' ', (_uppyDashboardFileCardPreview = document.createElement('div'), _uppyDashboardFileCardPreview.setAttribute('class', 'UppyDashboardFileCard-preview'), _appendChild(_uppyDashboardFileCardPreview, [' ', file.preview ? (_img = document.createElement('img'), _img.setAttribute('alt', '' + String(file.name) + ''), _img.setAttribute('src', '' + String(file.preview) + ''), _img) : (_uppyDashboardItemPreviewIcon = document.createElement('div'), _uppyDashboardItemPreviewIcon.setAttribute('style', 'color: ' + String(getFileTypeIcon(file.type.general, file.type.specific).color) + ''), _uppyDashboardItemPreviewIcon.setAttribute('class', 'UppyDashboardItem-previewIcon'), _appendChild(_uppyDashboardItemPreviewIcon, [' ', getFileTypeIcon(file.type.general, file.type.specific).icon, ' ']), _uppyDashboardItemPreviewIcon), ' ']), _uppyDashboardFileCardPreview), ' ', (_uppyDashboardFileCardInfo = document.createElement('div'), _uppyDashboardFileCardInfo.setAttribute('class', 'UppyDashboardFileCard-info'), _appendChild(_uppyDashboardFileCardInfo, [' ', (_uppyDashboardFileCardFieldset2 = document.createElement('fieldset'), _uppyDashboardFileCardFieldset2.setAttribute('class', 'UppyDashboardFileCard-fieldset'), _appendChild(_uppyDashboardFileCardFieldset2, [' ', (_uppyDashboardFileCardLabel2 = document.createElement('label'), _uppyDashboardFileCardLabel2.setAttribute('class', 'UppyDashboardFileCard-label'), _uppyDashboardFileCardLabel2.textContent = 'Name', _uppyDashboardFileCardLabel2), ' ', (_uppyDashboardFileCardInput2 = document.createElement('input'), _uppyDashboardFileCardInput2.setAttribute('name', 'name'), _uppyDashboardFileCardInput2.setAttribute('type', 'text'), _uppyDashboardFileCardInput2.setAttribute('value', '' + String(file.meta.name) + ''), _uppyDashboardFileCardInput2.onkeyup = tempStoreMeta, _uppyDashboardFileCardInput2.setAttribute('class', 'UppyDashboardFileCard-input'), _uppyDashboardFileCardInput2), ' ']), _uppyDashboardFileCardFieldset2), ' ', renderMetaFields(file), ' ']), _uppyDashboardFileCardInfo), ' ']), _uppyDashboardFileCardInner) : null, ' ', (_uppyDashboardActions = document.createElement('div'), _uppyDashboardActions.setAttribute('class', 'UppyDashboard-actions'), _appendChild(_uppyDashboardActions, [' ', (_uppyButtonCircular = document.createElement('button'), _uppyButtonCircular.setAttribute('type', 'button'), _uppyButtonCircular.setAttribute('title', 'Finish editing file'), _uppyButtonCircular.onclick = function () {
    return props.done(meta, file.id);
  }, _uppyButtonCircular.setAttribute('class', 'UppyButton--circular UppyButton--blue UppyDashboardFileCard-done'), _appendChild(_uppyButtonCircular, [checkIcon()]), _uppyButtonCircular), ' ']), _uppyDashboardActions), ' ']), _uppyDashboardFileCard;
};
//# sourceMappingURL=FileCard.js.map