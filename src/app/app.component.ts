import {Component} from '@angular/core';
import {ConfigService} from '../httpConnector/config.service';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  labels = [];
  data = [];

  constructor(private httpConnector: ConfigService) {
    this.httpConnector.getHumidityForPaprotka()
      .subscribe(res => {
        // @ts-ignore
        res.forEach( x => this.labels.push(x.date));
        // @ts-ignore
        res.forEach( x => {
          this.data.push(x.humidity);
        });
      });
  }

  lineChartData: ChartDataSets[] = [
    { data: this.data, label: 'Humidity for Polypody' },
  ];

  lineChartLabels: Label[] = this.labels;

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(0,111,255)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  getHumidityForPolypody() {

    for (; true;) {
      this.labels.pop();
      this.data.pop();

      if(this.labels.length === 0) {
        break;
      }
    }

    this.lineChartData = [
      { data: this.data, label: 'Humidity for Polypody' },
    ];

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgb(0,111,255)',
      },
    ];

    this.httpConnector.getHumidityForPaprotka()
      .subscribe(res => {
        // @ts-ignore
        res.forEach( x => this.labels.push(x.date));
        // @ts-ignore
        res.forEach( x => {
          this.data.push(x.humidity);
        });
      });
  }

  getHumidityForZamioculcas() {

    for (; true;) {
      this.labels.pop();
      this.data.pop();

      if(this.labels.length === 0) {
        break;
      }
    }

    this.lineChartData = [
      { data: this.data, label: 'Humidity for Zamioculcas' },
    ];

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgb(0,111,255)',
      },
    ];

    this.httpConnector.getHumidityForZamioculcas()
      .subscribe(res => {
        // @ts-ignore
        res.forEach( x => this.labels.push(x.date));
        // @ts-ignore
        res.forEach( x => {
          this.data.push(x.humidity);
        });
      });
  }

  getTemperatureForZamioculcas() {

    for (; true;) {
      this.labels.pop();
      this.data.pop();

      if(this.labels.length === 0) {
        break;
      }
    }

    this.lineChartData = [
      { data: this.data, label: 'Temperature for Zamioculcas' },
    ];

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgb(255,0,0)',
      },
    ];

    this.httpConnector.getTemperatureForZamioculcas()
      .subscribe(res => {
        // @ts-ignore
        res.forEach( x => this.labels.push(x.date));
        // @ts-ignore
        res.forEach( x => {
          this.data.push(x.temp);
        });
      });
  }

  getTemperatureForPolypody() {

    for (; true;) {
      this.labels.pop();
      this.data.pop();

      if(this.labels.length === 0) {
        break;
      }
    }

    this.lineChartData = [
      { data: this.data, label: 'Temperature for Polypody' },
    ];

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgb(255,0,0)',
      },
    ];

    this.httpConnector.getTemperatureForPaprotka()
      .subscribe(res => {
        // @ts-ignore
        res.forEach( x => this.labels.push(x.date));
        // @ts-ignore
        res.forEach( x => {
          this.data.push(x.temp);
        });
      });
  }

}
