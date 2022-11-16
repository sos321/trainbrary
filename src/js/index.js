// Make leaflet-gpx available
import _ from 'leaflet-gpx';

import * as Elements from './selector';
import { openAddFile, closeAddFile } from './view/addFileView';
import { openMenu, closeMenu } from './view/menuView';
import map from './map';
import loadGPX from './trainingBuilder';

map.init();

// Add zoom levels and current position habdlers
Elements.posBtn.addEventListener('click', map.setInitialPos);
Elements.zoomInBtn.addEventListener('click', map.zoomIn);
Elements.zoomOutBtn.addEventListener('click', map.zoomOut);

// Handling adding files
Elements.uploadBtnOpen.addEventListener('click', () => {
  closeMenu();
  openAddFile();
});
Elements.UploadBtnClose.addEventListener('click', closeAddFile);

Elements.fileInput.addEventListener('change', (e) => {
  loadGPX(e.target);
  // TODO Render the training list
  closeAddFile();
});

// Handling menu
Elements.btnMenuClose.addEventListener('click', closeMenu);
Elements.btnMenuOpen.addEventListener('click', openMenu);

// TODO future feature with editing names
/*
// * ContentEditable focus
const trainingsList = document.getElementById('trainings-list');

trainingsList.addEventListener('focusin', (e) => {
  e.target.textContent = e.target.textContent.trim();

  function getLength(event) {
    if (
      e.target.textContent.length > 25 &&
      event.keyCode !== 8 &&
      event.keyCode !== 13 &&
      event.keyCode !== 46
    ) {
      event.preventDefault();
    }

    if (event.keyCode === 13) {
      e.target.blur();
      e.target.removeEventListener('keydown', getLength);
    }
  }

  window.getSelection().selectAllChildren(e.target);

  e.target.addEventListener('keydown', getLength);
});

// On lose focus
trainingsList.addEventListener('focusout', (e) => {
  console.log(e.target.textContent);
});
*/
