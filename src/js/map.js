import * as L from 'leaflet';
import AJAX from './helpers';
import { API_IP_GEO, INITIAL_ZOOM } from './config';
import cycleSvg from '../img/icon-cycle.svg';

// Check if map already exists
/* eslint-disable */
const container = L.DomUtil.get('map');
if (container != null) {
  container._leaflet_id = null;
}
/* eslint-enable */

let initialPosition = [51.5, -0.11];
const map = L.map('map', { zoomControl: false });

async function getInitialPosition() {
  const data = await AJAX(API_IP_GEO);

  initialPosition = [data.lat, data.lon];
}

async function initMapView() {
  try {
    await getInitialPosition();
  } catch (err) {
    initialPosition = [51.5, -0.11];
  } finally {
    map.setView(initialPosition, INITIAL_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }
}

function setInitialPosition() {
  map.setView(initialPosition, INITIAL_ZOOM, { animate: true, duration: 600 });
}

function setPosition(coords, zoom = map.getZoom()) {
  map.setView(coords, zoom, { animate: true, duration: 600 });
}

function zoomIn() {
  map.setZoom(map.getZoom() + 1, { animate: true, duration: 300 });
}

function zoomOut() {
  map.setZoom(map.getZoom() - 1, { animate: true, duration: 300 });
}

function setZoom(zoom) {
  map.setZoom(zoom, { animate: true, duration: 300 });
}

function addToMapCenter(layer) {
  map.fitBounds(layer.getBounds());
  layer.addTo(map);
}

const fileInput = document.getElementById('file');
fileInput.addEventListener('change', () => {
  const selectedFile = fileInput.files[0];

  const reader = new FileReader();

  reader.readAsText(selectedFile);

  const cycleIcon = L.icon({
    iconUrl: cycleSvg,
    iconSize: [94, 50],
    iconAnchor: [47, 25],
  });

  reader.onload = () => {
    const gpx = reader.result;

    try {
      const track = new L.GPX(gpx, {
        async: true,
        polyline_options: {
          color: '#1abc9c',
          weight: 3,
          lineCap: 'round',
        },
        marker_options: {
          endIcon: {
            icon: null,
          },
          startIcon: cycleIcon,
        },
      });

      track.on('loaded', () => console.log('Success'));

      track.addTo(map);
    } catch (err) {
      console.log('Failed!');
    }

    // * How it works
    // const detail = document.querySelector('.training');
    // detail.addEventListener('click', () => {
    //   map.fitBounds(track.getBounds());
    //   track.addTo(map);
    // });
  };
});

// TODO Extract into own module

const mapAPI = {
  init: initMapView,
  setInitialPos: setInitialPosition,
  moveTo: setPosition,
  zoomTo: setZoom,
  zoomIn,
  zoomOut,
  center: addToMapCenter,
};

export default mapAPI;
