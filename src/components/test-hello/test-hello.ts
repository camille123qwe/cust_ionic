import { Component } from '@angular/core';

/**
 * Generated class for the TestHelloComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'test-hello',
  templateUrl: 'test-hello.html'
})
export class TestHelloComponent {

  text: string;

  constructor() {
    console.log('Hello TestHelloComponent Component');
    this.text = 'Hello World';
  }

}
