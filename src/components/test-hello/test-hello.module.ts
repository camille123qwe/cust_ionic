import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestHelloComponent } from './test-hello';

@NgModule({
  declarations: [
    TestHelloComponent,
  ],
  imports: [
    IonicPageModule.forChild(TestHelloComponent),
  ],
  exports: [
    TestHelloComponent
  ]
})
export class TestHelloComponentModule {}
