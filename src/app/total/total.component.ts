import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TotalComponent implements OnInit {
  dataSource = new MatTableDataSource(POSTER_DATA);
  columnsToDisplay = ['title', 'author', 'org'];
  expandedElement: Presentation | null;
  constructor() { }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Presentation {
  author: string;
  title: string;
  org: string;
  path: string;
}

const POSTER_DATA: Presentation[] = [
  {
    author: 'Naut, Astro',
    title: 'Space and Power Fun',
    org: 'NASA',
    path: 'space_power_fun',
  }, 
  {
    author: 'Stocker, Justin',
    title: 'Battery Testing',
    org: 'Aerospace',
    path: 'battery_testing',
  }, 
  {
    author: 'MacDougall, Kevin',
    title: 'Battery Explosions',
    org: 'BEL',
    path: 'battery_explosions',
  }, 
];
