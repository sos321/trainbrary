import * as L from 'leaflet';
import { INITIAL_ZOOM } from './config';

// Check if map already exists
/* eslint-disable */
const container = L.DomUtil.get('map');
if (container != null) {
  container._leaflet_id = null;
}
/* eslint-enable */

const map = L.map('map', { zoomControl: false });

function setUserView() {
  const defaultPos = [52, 0];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], INITIAL_ZOOM);
      },
      () => map.setView(defaultPos, INITIAL_ZOOM)
    );
  } else {
    map.setView(defaultPos, INITIAL_ZOOM);
  }
}
setUserView();

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

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

function addToMap(layer) {
  layer.addTo(map);
}

const mapAPI = {
  userPos: setUserView,
  moveTo: setPosition,
  zoomTo: setZoom,
  zoomIn,
  zoomOut,
  add: addToMap,
};

export default mapAPI;
