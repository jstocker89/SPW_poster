import { Injectable } from '@angular/core';
import {Presentation} from './presentation';
import {POSTER_DATA} from './presentation-list';

@Injectable({
  providedIn: 'root'
})
export class PosterService {
  getPosters(): Presentation[] {
    return POSTER_DATA;
  }
  getPoster(path: string): Presentation {
    return POSTER_DATA.find(presentation => presentation.path === path);
  }
  constructor() { }
}
