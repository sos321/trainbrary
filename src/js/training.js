class Training {
  constructor(gpxData, track, id) {
    this.name = gpxData.get_name();
    this.startTime =
      gpxData.get_start_time().getTime() ===
      new Date('1970-01-01T00:00:00').getTime()
        ? new Date()
        : gpxData.get_start_time();
    this.id = id;
    this.distance = Math.round(gpxData.get_distance()) / 1000;
    this.duration = gpxData.get_duration_string_iso(
      gpxData.get_total_time(),
      true
    );
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
