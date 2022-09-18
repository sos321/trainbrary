// * Map creation
import * as L from 'leaflet';

const map = L.map('map', {
  zoomControl: false,
}).setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

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

// * Upload files
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
