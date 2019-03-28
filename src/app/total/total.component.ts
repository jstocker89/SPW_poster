import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Presentation} from '../presentation';
import {PosterService} from '../poster.service';
import { DOCUMENT } from '@angular/common';

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
  
  dataSource = new MatTableDataSource(this.posterService.getPosters());
  columnsToDisplay = ['title', 'author', 'org', 'session'];
  expandedElement: Presentation | null;
  selectedPresentation: Presentation;
  constructor(private posterService: PosterService) { }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    document.body.style.zoom="100%";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onClickMe(presentation: Presentation) {
    this.selectedPresentation = presentation;
  }
  
}

// export interface Presentation {
//   author: string;
//   title: string;
//   org: string;
//   session: string;
//   path: string;
// }

