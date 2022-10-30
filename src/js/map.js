import * as L from 'leaflet';
import AJAX from './helpers';
import { API_IP_GEO, INITIAL_ZOOM } from './config';
import cycleSvg from '../img/icon-cycle.svg';

// Check if map already exists
const container = L.DomUtil.get('map');
if (container != null) {
  container._leaflet_id = null;
}

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

const fileInput = document.getElementById('file');
fileInput.addEventListener('change', () => {
  const selectedFile = fileInput.files[0];

  const reader = new FileReader();

  reader.readAsText(selectedFile);

  const cycleIcon = L.icon({
    iconUrl: cycleSvg,
    iconSize: [150, 80],
    iconAnchor: [-20, -27],
  });

  reader.onload = () => {
    const gpx = reader.result;

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
        startIconUrl: cycleSvg,
      },
    });
    track.addTo(map);
  };
  // TODO add error handling
});

const mapAPI = {
  init: initMapView,
  setInitialPos: setInitialPosition,
  moveTo: setPosition,
  zoomTO: setZoom,
  zoomIn,
  zoomOut,
};

export default mapAPI;
