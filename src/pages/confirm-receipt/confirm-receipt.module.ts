import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmReceiptPage } from './confirm-receipt';

@NgModule({
  declarations: [
    ConfirmReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmReceiptPage),
  ],
  exports: [
    ConfirmReceiptPage
  ]
})
export class ConfirmReceiptPageModule {}
