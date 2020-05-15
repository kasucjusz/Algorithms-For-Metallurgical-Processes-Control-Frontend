import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../httpConnector/config.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  chart: Chart[] = [];
  median;
  average;
  dataSource;
  title = 'aspm-frontend';
  displayedColumns = [
    'Czas',
    'P1108',
    'P1118',
    'P1120',
    'P1122',
    'P1124',
    'P1126',
    'P1128',
    'P1130',
    'P1132',
    'P1146',
    'P1148',
    'P1150',
    'P1152',
    'P1154',
    'P1156',
    'P1158',
    'P1160',
    'P1162',
    'P1164',
    'P1166',
    'P1168',
    'P1170',
    'P1172'
  ];

  constructor(private httpConnector: ConfigService) {
    this.httpConnector.getAllData()
      .subscribe(res => {
        // @ts-ignore
        this.dataSource = res;
        console.log('Loaded');
        console.log(res);
      });
  }

  speeds = [
    {value: 'all', viewValue: 'Wszystkie dane'},
    {value: '0.0', viewValue: '0.0'},
    {value: '0.1', viewValue: '0.1'},
    {value: '0.2', viewValue: '0.2'},
    {value: '0.3', viewValue: '0.3'},
    {value: '0.4', viewValue: '0.4'},
    {value: '0.5', viewValue: '0.5'},
    {value: '0.6', viewValue: '0.6'},
    {value: '0.7', viewValue: '0.7'},
    {value: '0.8', viewValue: '0.8'},
    {value: '0.9', viewValue: '0.9'},
    {value: '1', viewValue: '1.0'},
  ];

  changeSpeed($event) {
    this.chart = [];
    const param = $event.source.value;
    if ($event.isUserInput) {
      console.log(param);
      if (param === 'all') {
        this.httpConnector.getAllData()
          .subscribe(res => {
            // @ts-ignore
            this.dataSource = res;
            console.log('Loaded');
            console.log(res);
          });
      } else {
        this.httpConnector.getBySpeed(param)
          .subscribe(res => {
            // @ts-ignore
            this.dataSource = res;
            console.log('Loaded');
            console.log(res);
          });
      }
    }
  }

  changeParameter($event) {
    this.chart = [];
    const values = [];
    const dates = [];
    let param = $event.source.value;
    param = param === 'Czas' ? 'time' : param;
    const json = JSON.stringify(this.dataSource);
    JSON.parse(json, (key, value) => {
      if (key.toLowerCase() === param.toLowerCase()) {
        console.log('WARTOSC', value);
        values.push(value);
      }
      if (key.toLowerCase() === 'time') {
        dates.push(value);
      }
    });

    // @ts-ignore
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            data: values,
            borderColor: '#3cba9f',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    console.log('WARTOSCI ', values);
    console.log('MEDIANA',  median(values));
  }

  ngOnInit(): void {
  }
}

function median(values) {
  values.sort( function(a,b) {return a - b;} );
  var half = Math.floor(values.length/2);

  if(values.length % 2)
    return values[half];
  else
    return (Number(values[half])+ Number(values[half+1]))/2;
}
