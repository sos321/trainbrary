import * as L from 'leaflet';
import AJAX from './helpers';
import { API_IP_GEO, INITIAL_ZOOM } from './config';

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

const mapAPI = {
  init: initMapView,
  setInitialPos: setInitialPosition,
  moveTo: setPosition,
  zoomTO: setZoom,
  zoomIn,
  zoomOut,
};

export default mapAPI;
