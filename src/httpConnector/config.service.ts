import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  getHumidityForPaprotka() {
    return this.http.get('api/humidity/humidityForPaprotka');
  }

  getHumidityForZamioculcas() {
    return this.http.get('api/humidity/humidityForZamioculcas');
  }

  getHumidityStaticsForPaprotka() {
    return this.http.get('api/humidity/humidityStaticsForPaprotka');
  }

  getTemperatureForPaprotka() {
    return this.http.get('api/temperature/temperatureForPaprotka');
  }

  getTemperatureForZamioculcas() {
    return this.http.get('api/temperature/temperatureForZamioculcas');
  }

}
