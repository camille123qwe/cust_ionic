import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDeliveryPage } from './home-delivery';
// import { TestHelloComponent } from '../../components/test-hello/test-hello';

@NgModule({
  declarations: [
    HomeDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDeliveryPage),
    // TestHelloComponent
  ],
  exports: [
    HomeDeliveryPage
  ]
})
export class HomeDeliveryPageModule {}
