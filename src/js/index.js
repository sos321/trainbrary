import * as L from 'leaflet';
import _ from 'leaflet-gpx';
import map from './map';
import searchPlaceHandler from './placeSearch';

map.init();

// * Closing and opening menu
const btnMenuOpen = document.getElementById('open-menu');
const btnMenuClose = document.getElementById('close-menu');
const menu = document.getElementById('menu');
const uploadBtn = document.getElementById('open-upload');

btnMenuOpen.addEventListener('click', () => {
  if (menu.classList.contains('active')) return;

  menu.classList.add('active');
  uploadBtn.classList.add('move');
});

function closeMenu() {
  if (!menu.classList.contains('active')) return;

  menu.classList.remove('active');
  uploadBtn.classList.remove('move');
  uploadBtn.classList.add('transitioning');

  setTimeout(() => uploadBtn.classList.remove('transitioning'), 300);
}

btnMenuClose.addEventListener('click', closeMenu);

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

// * Upload files open modal
const btnUploadClose = document.getElementById('close-upload');
const upload = document.getElementById('add-file');

uploadBtn.addEventListener('click', () => {
  closeMenu();
  upload.classList.add('active');
});

btnUploadClose.addEventListener('click', () => {
  upload.classList.remove('active');
});

// Close when user clicks outside
upload.addEventListener('click', (e) => {
  if (!e.target.closest('.add-file-content')) upload.classList.remove('active');
});

// Add zoom levels and current position habdlers
const posBtn = document.getElementById('initial-pos');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

posBtn.addEventListener('click', map.setInitialPos);
zoomInBtn.addEventListener('click', map.zoomIn);
zoomOutBtn.addEventListener('click', map.zoomOut);

const searchPlace = document.getElementById('search-place');
searchPlace.addEventListener('input', searchPlaceHandler);
