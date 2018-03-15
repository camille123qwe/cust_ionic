import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReturnRequestPage } from './return-request';

@NgModule({
  declarations: [
    ReturnRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ReturnRequestPage),
  ],
  exports: [
    ReturnRequestPage
  ]
})
export class ReturnRequestPageModule {}
