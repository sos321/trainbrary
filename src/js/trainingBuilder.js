import * as L from 'leaflet';
import { Running } from './training';
import map from './map';

const workouts = [];
const colors = new Map([
  ['running', '#2c3e50'],
  ['other', '#2c3e50'],
]);

function createTrainingType(type, gpxData, track) {
  if (type === 'running') {
    workouts.push(new Running(gpxData, track));
  }
}

function getType(gpx) {
  // TODO add DOMParser and parse the gpx file and get the type
  return 'running';
}

function showPopup(result) {
  // TODO Display messages
  console.log(result);
}

function parseGPX(gpx) {
  const type = getType(gpx);

  try {
    const track = new L.GPX(gpx, {
      async: true,
      polyline_options: {
        color: colors.get(type) || '#2c3e50',
        weight: 3,
        lineCap: 'round',
      },
      // TODO Add markers
    });

    track.on('addpoint', (e) => {
      // TODO Create Icon
      // TODO Add icon to according group
      // TODO Add click handler on icon
      if (e.point_type === 'start') console.log(e.point.getLatLng());
    });

    track.on('loaded', (e) => {
      createTrainingType('running', e.target, track);

      showPopup('Success');
    });

    map.add(track);
  } catch (err) {
    showPopup('Fail');
  }
}

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
