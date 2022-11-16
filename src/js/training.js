class Training {
  constructor(gpxData, track) {
    this.name = gpxData.get_name();
    this.startTime = gpxData.get_start_time();
    this.id = gpxData.get_start_time().getTime().toString().slice(-10);
    this.distance = gpxData.get_distance();
    this.duration = gpxData.get_total_time();
    this.speed = gpxData.get_moving_speed();
    this.elevation = gpxData.get_elevation_gain();
    // TODO Calories in each class
    this.calories = 0;
  }

  setTimeDescription() {
    this.timeDescription = `${this.startTime.getDay()} ${this.startTime.getMonth()} ${this.startTime.getFullYear()} at ${this.startTime.getHours()}`;
  }

  async getPlace() {
    // TODO Geolocation
    this.city = 'No City Found';
    this.country = 'No State Found';
  }

  setPlaceDescription() {
    this.placeDescription = `In ${this.city}, ${this.country}`;
  }
}

export class Running extends Training {
  constructor(gpxData) {
    super(gpxData);
    this.type = 'running';
  }
}

export class Cycling extends Training {
  constructor(gpxData) {
    super(gpxData);
    this.type = 'cycling';
  }
}

export class Walking extends Training {
  constructor(gpxData) {
    super(gpxData);
    this.type = 'walking';
  }
}
export class Swimming extends Training {
  constructor(gpxData) {
    super(gpxData);
    this.type = 'swimming';
  }
}

export class Other extends Training {
  constructor(gpxData) {
    super(gpxData);
    this.type = 'other';
  }
}
