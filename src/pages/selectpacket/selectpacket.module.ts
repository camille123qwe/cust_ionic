import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectpacketPage } from './selectpacket';

@NgModule({
  declarations: [
    SelectpacketPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectpacketPage),
  ],
  exports: [
    SelectpacketPage
  ]
})
export class SelectpacketPageModule {}
