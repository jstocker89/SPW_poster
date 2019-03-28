import { Component, OnInit, Input } from '@angular/core';
import { Presentation } from '../presentation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PosterService} from '../poster.service';

const ZOOM_STEP:number = 0.25;
const DEFAULT_ZOOM:number = 1;

@Component({
  selector: 'app-poster-detail',
  templateUrl: './poster-detail.component.html',
  styleUrls: ['./poster-detail.component.css']
})
export class PosterDetailComponent implements OnInit {
  @Input() presentation: Presentation;

  public pdfZoom:number = DEFAULT_ZOOM;
  constructor(
    private route: ActivatedRoute,
    private posterService: PosterService,
    private location: Location
  ) { }
    
  ngOnInit() {
    this.getPoster();
    this.zoom_to = 0.5;
  }
  getPoster(): void{
    const path = this.route.snapshot.paramMap.get('path');
    this.presentation = this.posterService.getPoster(path);
  }
  goBack(): void {
    this.location.back();
  }
  zoom_to: number;
  zoom_in() {
    this.pdfZoom += ZOOM_STEP;
  }
  zoom_out() {
    this.pdfZoom -= ZOOM_STEP;
  }
}
