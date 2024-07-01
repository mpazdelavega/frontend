import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _pageProductEventEmitter = new EventEmitter();

  constructor() { }

  get pageProductEventEmitter() {
    return this._pageProductEventEmitter;
  }
}
