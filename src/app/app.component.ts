import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../httpConnector/config.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart: Chart;
  dataSource;

  title = 'aspm-frontend';

  median = 0;
  average = 0;
  min = 0;
  max = 0;

  displayedColumns = [
    'P1010', 'P1012', 'P1014', 'P1034', 'P1036', 'P1038', 'P1044', 'P1046', 'P1048', 'P1050',
    'P1052', 'P1054', 'P1058', 'P1060', 'P1062', 'P1064', 'P1066', 'P1068', 'P1070', 'P1072',
    'P1074', 'P1076', 'P1078', 'P1080', 'P1094', 'P1096', 'P1098', 'P1100', 'P1102', 'P1104',
    'P1106', 'P1108', 'P1110', 'P1112', 'P1114', 'P1118', 'P1120', 'P1122', 'P1124', 'P1126',
    'P1128', 'P1130', 'P1132', 'P1134', 'P1136', 'P1138', 'P1140', 'P1142', 'P1144', 'P1146',
    'P1148', 'P1150', 'P1152', 'P1154', 'P1156', 'P1158', 'P1160', 'P1162', 'P1164', 'P1166',
    'P1168', 'P1170', 'P1172', 'P1174', 'P1176', 'P1178', 'P1180', 'P1182', 'P1184', 'P1186',
    'P1188', 'P1192', 'P1194', 'P1426', 'P1427', 'P1433', 'P1434', 'P1435', 'P1440'
  ];

  constructor(private httpConnector: ConfigService) {
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
    {value: '1.0', viewValue: '1.0'},
    {value: '1.1', viewValue: '1.1'},
  ];

  readLocalStorageValue(key) {
    return localStorage.getItem(key);
  }

  csvInputChange(fileInputEvent: any) {
    this.httpConnector.sendFile(fileInputEvent.target.files[0])
      .subscribe(res => {
        localStorage.setItem('url', res[0]);
    });
  }

  changeSpeed($event) {
    const param = $event.source.value;
    if ($event.isUserInput) {
      if (param === 'all') {
        this.httpConnector.getAllData()
          .subscribe(res => {
            // @ts-ignore
            this.dataSource = res;
          });
      } else {
        this.httpConnector.getBySpeed(param)
          .subscribe(res => {
            // @ts-ignore
            this.dataSource = res;
          });
      }
    }
  }

  changeParameter($event) {
    if(this.chart !== undefined) {
      this.chart.destroy();
    }
    const values = [];
    const dates = [];
    const param = $event.source.value;
    const json = JSON.stringify(this.dataSource);
    JSON.parse(json, (key, value) => {
      if (key.toLowerCase() === param.toLowerCase()) {
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
            borderColor: '#a73cba',
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

    this.median = this.getMedian(values);
    this.average = this.getAverage(values);
    this.min = this.getMin(values);
    this.max = this.getMax(values);
  }

  ngOnInit(): void {
  }

  getMedian(values) {
    if (!values || values.length <= 0) {
      return 0;
    }
    values.sort((a, b) => a - b );
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
      return values[half];
    }
    return (Number(values[half]) + Number(values[half + 1])) / 2;
  }

  getAverage(values) {
    return values.reduce((acc, cur) => Number(acc) + Number(cur), 0) / 2;
  }

  getMin(values) {
    if (!values || values.length <= 0) {
      return 0;
    }
    return Math.min.apply(Math, values.map(Number));
  }

  getMax(values) {
    if (!values || values.length <= 0) {
      return 0;
    }
    return Math.max.apply(Math, values.map(Number));
  }
}
