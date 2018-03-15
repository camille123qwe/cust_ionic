import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideImgPage } from './slide-img';

@NgModule({
  declarations: [
    SlideImgPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideImgPage),
  ],
  exports: [
    SlideImgPage
  ]
})
export class SlideImgPageModule {}
