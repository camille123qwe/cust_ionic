import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TelephonePage } from '../call-modal/call-modal';
import { CallProvider } from '../../providers/call-provider';

/*
  Generated class for the Callback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-callback',
  templateUrl: 'callback.html'
})
export class CallbackPage {
	
	callphone;
  cb_img = 'assets/img/cb_img.png';
  constructor(public navCtrl: NavController, public navParams: NavParams,public call: CallProvider,) {
  	this.callphone = this.navParams.data.phoneNumber;
//  console.log('8888888888888888888'+JSON.stringify(this.navParams.data.phoneNumber));
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CallbackPage');
    

  }
  goCall(){
  	this.navCtrl.pop();
  }
}
