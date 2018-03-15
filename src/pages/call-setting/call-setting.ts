import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TelephonePage } from '../call-modal/call-modal';

@Component({
  selector: 'page-call-setting',
  templateUrl: 'call-setting.html'
})
export class CallSettingPage {
  call_type: string ;

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let call_type_local: string = localStorage.getItem('call_type');
    if (call_type_local == null) {
      localStorage.setItem('call_type', 'call_back');
      this.call_type = 'call_back';
    }else{
    this.call_type = localStorage.getItem('call_type');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallSettingPage');
 
  }
  ionViewWillLeave() {
    console.log(this.call_type);
    localStorage.setItem('call_type', this.call_type);

  }
  
  fanhui(){
  	this.navCtrl.pop();
  }

}
