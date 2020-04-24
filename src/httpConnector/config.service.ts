import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  getAllData() {
    return this.http.get('api/csv');
  }

  getBySpeed(speed: string) {
    return this.http.get('api/csv/' + speed);
  }
}
