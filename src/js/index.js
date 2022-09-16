import * as L from 'leaflet';

const map = L.map('map', {
  zoomControl: false,
}).setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
