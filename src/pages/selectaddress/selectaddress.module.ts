import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectaddressPage } from './selectaddress';

@NgModule({
  declarations: [
    SelectaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectaddressPage),
  ],
  exports: [
    SelectaddressPage
  ]
})
export class SelectaddressPageModule {}
