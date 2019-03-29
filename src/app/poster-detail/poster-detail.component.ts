import { Component, OnInit, Input } from '@angular/core';
import { Presentation } from '../presentation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PosterService} from '../poster.service';

const ZOOM_STEP:number = 0.1;
const DEFAULT_ZOOM:number = 0.75;

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
    if(this.pdfZoom < 2){
      this.pdfZoom += ZOOM_STEP;
    }
    
  }
  zoom_out() {
    if (this.pdfZoom > 0.25){
      this.pdfZoom -= ZOOM_STEP;
    }
    
  }
  reset_zoom() {
    this.pdfZoom = DEFAULT_ZOOM;
  }
}
