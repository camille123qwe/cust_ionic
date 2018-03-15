import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShipaddrPage } from './add-shipaddr';

@NgModule({
  declarations: [
    AddShipaddrPage,
  ],
  imports: [
    IonicPageModule.forChild(AddShipaddrPage),
  ],
  exports: [
    AddShipaddrPage
  ]
})
export class AddShipaddrPageModule {}
