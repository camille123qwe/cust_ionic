import { Component } from '@angular/core';
// import {IONIC_DIRECTIVES} from 'ionic-framework/config/directives';
// import {List, Item} from 'ionic/ionic';

@Component({
  selector: 'my-card',
  templateUrl: 'my-card.html',
  // directives: [List,Item]
})
export class MyCardComponent {

  constructor() {
    console.log('Hello MyCard Component');
  }

}
