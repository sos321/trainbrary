import { workouts } from '../state';
import { trainingsList } from '../selector';

const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default function updateTrainings() {
  trainingsList.innerHTML = '';

  workouts.forEach((workout) => {
    const el = document.createElement('div');
    el.classList.add('training');
    el.dataset.id = workout.id;

    /* eslint indent: "off" */
    el.innerHTML = `
    <div class="training-side-color-panel"></div>
    <div class="training-content">
        <h3
            class="training-title"
            id="training-title"
            contenteditable="true">
        ${workout.name}
        </h3>
        <ion-icon name="pencil-outline" class="training-icon"></ion-icon>
        <div class="training-info-holder">
            <div class="training-info">
                <p class="name">Distance:</p>
                <p class="value">${workout.distance} km</p>
            </div>
            <div class="training-info">
                <p class="name">Duration:</p>
                <p class="value">${workout.duration}</p>
            </div>
        </div>
        <div class="training-detail-holder">
            <p class="city">Prague</p>
            <p class="date">${workout.startTime.toLocaleDateString(
              userLocale,
              options
            )}</p>
        </div>
    </div>
    `;

    trainingsList.appendChild(el);
  });
}
