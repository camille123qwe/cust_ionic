import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitPaymentPage } from './wait-payment';

@NgModule({
  declarations: [
    WaitPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitPaymentPage),
  ],
  exports: [
    WaitPaymentPage
  ]
})
export class WaitPaymentPageModule {}
