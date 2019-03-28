import { Component, OnInit, Input } from '@angular/core';
import { Presentation } from '../presentation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PosterService} from '../poster.service';

@Component({
  selector: 'app-poster-detail',
  templateUrl: './poster-detail.component.html',
  styleUrls: ['./poster-detail.component.css']
})
export class PosterDetailComponent implements OnInit {
  @Input() presentation: Presentation;

  constructor(
    private route: ActivatedRoute,
    private posterService: PosterService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPoster();
  }
  getPoster(): void{
    const path = this.route.snapshot.paramMap.get('path');
    this.presentation = this.posterService.getPoster(path);
  }
  goBack(): void {
    this.location.back();
  }
}
