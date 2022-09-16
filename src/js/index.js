// Map creation
import * as L from 'leaflet';

const map = L.map('map', {
  zoomControl: false,
}).setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Closing and opening menu
const btnMenuOpen = document.getElementById('open-menu');
const btnMenuClose = document.getElementById('close-menu');
const menu = document.getElementById('menu');
const uploadBtn = document.getElementById('upload');

btnMenuOpen.addEventListener('click', () => {
  if (menu.classList.contains('active')) return;

  menu.classList.add('active');
  uploadBtn.classList.add('move');
});

btnMenuClose.addEventListener('click', () => {
  if (!menu.classList.contains('active')) return;

  menu.classList.remove('active');
  uploadBtn.classList.remove('move');
  uploadBtn.classList.add('transitioning');

  setTimeout(() => uploadBtn.classList.remove('transitioning'), 300);
});
