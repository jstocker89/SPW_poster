import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Presentation } from '../presentation';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PosterService} from '../poster.service';
import * as Hammer from 'hammerjs';


const DEFAULT_ZOOM:number = 1.0;
var myElement = document.body;
var hammertime = new Hammer(myElement, {
  touchAction: "auto",
});
hammertime.get('pinch').set({ enable: true });

@Component({
  selector: 'app-poster-detail',
  templateUrl: './poster-detail.component.html',
  styleUrls: ['./poster-detail.component.css'],
  animations: [
    trigger('menuHide', [
      state('hide', style({height: '0px', minHeight: '0', display: 'none'})),
      state('show', style({height: '*'})),
      transition('show <=> hide', animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('buttonHide', [
      state('hide', style({height: '0px', minHeight: '0', display: 'none'})),
      state('show', style({height: '*'})),
      transition('* => hide', 
       animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0})),
       
      ),
      transition('* => show', 
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({height: "*"})),
       ),
    ]),
  ],
})
export class PosterDetailComponent implements OnInit {
  @Input() presentation: Presentation;
  PINCH_ZOOM: number = 0.025;
  BUTTON_ZOOM: number = 0.1;
  showMenu: string;
  pdfZoom:number = DEFAULT_ZOOM;
  constructor(
    private route: ActivatedRoute,
    private posterService: PosterService,
    private location: Location
  ) { }
    
  ngOnInit() {
    this.getPoster();
    this.showMenu = "show";
  }
  getPoster(): void{
    const path = this.route.snapshot.paramMap.get('path');
    this.presentation = this.posterService.getPoster(path);
  }
  goBack(): void {
    this.location.back();
  }
  
  zoom_in(step: number) {
    if(this.pdfZoom < 3){
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
  showToggle(){
    this.showMenu = "show" || "hide";
  }
}
