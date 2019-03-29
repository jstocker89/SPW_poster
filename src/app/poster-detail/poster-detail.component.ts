import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Presentation } from '../presentation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PosterService} from '../poster.service';
import * as Hammer from 'hammerjs';


const ZOOM_STEP:number = 0.;
const DEFAULT_ZOOM:number = 0.5;
var myElement = document.body;
var hammertime = new Hammer(myElement, {
  touchAction: "auto",
});
hammertime.get('pinch').set({ enable: true });

@Component({
  selector: 'app-poster-detail',
  templateUrl: './poster-detail.component.html',
  styleUrls: ['./poster-detail.component.css']
})
export class PosterDetailComponent implements OnInit {
  @Input() presentation: Presentation;
 
  pdfZoom:number = DEFAULT_ZOOM;
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
  
  zoom_in(step: number) {
    if(this.pdfZoom < 2){
      this.pdfZoom += step;
    }
    
  }
  zoom_out(step: number) {
    if (this.pdfZoom > 0.25){
      this.pdfZoom -= step;
    }
    
  }
  reset_zoom() {
    this.pdfZoom = DEFAULT_ZOOM;
  }
}
