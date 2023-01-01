import * as L from 'leaflet';
import { Running, Walking, Cycling, Swimming, Other } from './training'; // eslint-disable-line
import map from './map';
import { workouts } from './state';
import updateTrainings from './view/trainingListView';

import startImg from '../img/pin-icon-start.png';
import endImg from '../img/pin-icon-end.png';
import shadowImg from '../img/pin-shadow.png';

import runningIcon from '../img/icon-run.png';

const colors = Object.freeze({
  running: '#f39c12',
  walking: '#bbe73c',
  cycling: '#1abc9c',
  swimming: '#9b59b6',
  other: '#75bc1a',
});

function createTrainingType(type, gpxData, track, id) {
  switch (type) {
    case 'running':
      workouts.push(new Running(gpxData, track, id));
      break;
    case 'walking':
      workouts.push(new Walking(gpxData, track, id));
      break;
    case 'cycling':
      workouts.push(new Cycling(gpxData, track, id));
      break;
    case 'swimming':
      workouts.push(new Swimming(gpxData, track, id));
      break;
    default:
      workouts.push(new Other(gpxData, track, id));
  }
}

function createIcon(type) {
  // TODO Make based on type

  return L.icon({
    iconUrl: runningIcon,
    iconSize: [40, 66],
    iconAnchor: [22, 60],
    popupAnchor: [-3, -76],
    shadowUrl: shadowImg,
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
}

function getType(gpx) {
  // TODO add DOMParser and parse the gpx file and get the type
  return 'running';
}

function showPopup(result) {
  // TODO Display messages
  console.log(result);
}

function getID() {
  return parseInt(Math.random().toString().slice(-10), 10);
}

function parseGPX(gpx) {
  const type = getType(gpx);
  const id = getID();

  try {
    const track = new L.GPX(gpx, {
      async: true,
      polyline_options: {
        color: colors[type] || '#2c3e50',
        weight: 3,
        lineCap: 'round',
      },
      marker_options: {
        startIconUrl: startImg,
        endIconUrl: endImg,
        shadowUrl: shadowImg,
      },
      // TODO Change markers
    });

    track.on('addpoint', (e) => {
      // TODO Add icon to according group
      // TODO Add click handler on icon
      if (e.point_type !== 'start') return;

      const icon = createIcon(type);
      const { lat, lng } = e.point.getLatLng();
      const marker = L.marker([lat, lng], { icon });
      marker.id = id;

      map.add(marker);

      // TODO Add clickHandler to marker
      marker.on('click', () => console.log(marker.id));
    });

    track.on('loaded', (e) => {
      createTrainingType('running', e.target, track, id);

      updateTrainings();

      showPopup('Success');
    });
  } catch (err) {
    showPopup('Fail');
    console.error(err);
  }
}

// Get the gpx from the file
export default function createTrainings(fileInput) {
  const selectedFiles = fileInput.files;

  selectedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      parseGPX(reader.result);
    };
  });
}
