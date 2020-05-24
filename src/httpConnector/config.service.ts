import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  getAllData() {
    return this.http.post('api/csv', localStorage.getItem('url'));
  }

  getBySpeed(speed: string) {
    return this.http.post('api/csv/' + speed, localStorage.getItem('url'));
  }

  sendFile(fileInputEvent: any) {
    const data: FormData = new FormData();
    data.append('file', fileInputEvent);

    return this.http.post('api/csv/save', data);
  }

}
