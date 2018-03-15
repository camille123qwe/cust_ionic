import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditaddressPage } from './editaddress';

@NgModule({
  declarations: [
    EditaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(EditaddressPage),
  ],
  exports: [
    EditaddressPage
  ]
})
export class EditaddressPageModule {}
