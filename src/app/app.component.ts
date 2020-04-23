import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../httpConnector/config.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  title = 'aspm-frontend';
  displayedColumns = [
    'Czas',
    'P1010',
    'P1012',
    'P1014',
    'P1034',
    'P1036',
    'P1038',
    'P1044',
    'P1046',
    'P1048',
    'P1050',
    'P1052',
    'P1054',
    'P1058',
    'P1060',
    'P1062',
    'P1064',
    'P1066',
    'P1068',
    'P1070',
    'P1072',
    'P1074',
    'P1076',
    'P1078',
    'P1080',
    'P1094',
    'P1096',
    'P1098',
    'P1100',
    'P1102',
    'P1104',
    'P1106',
    'P1108',
    'P1110',
    'P1112',
    'P1114',
    'P1118'/*,
    'P1120',
    'P1122',
    'P1124',
    'P1126',
    'P1128',
    'P1130',
    'P1132',
    'P1134',
    'P1136',
    'P1138',
    'P1140',
    'P1142',
    'P1144',
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
    'P1172',
    'P1174',
    'P1176',
    'P1178',
    'P1180',
    'P1182',
    'P1184',
    'P1186',
    'P1188',
    'P1192',
    'P1194',
    'P1426',
    'P1427',
    'P1433',
    'P1434',
    'P1435',
    'P1440'*/
  ];
  dataSource;

  constructor(private httpConnector: ConfigService) {
    this.httpConnector.getAllData()
      .subscribe(res => {
        // @ts-ignore
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter: string): boolean => data.p1034.toLowerCase().includes(filter) || data.p1036.toLowerCase().includes(filter);
        console.log('Loaded');
        console.log(res);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void { }
}
