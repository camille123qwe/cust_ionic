import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController } from 'ionic-angular';
import { constVar } from '../../common/global';


@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html'
})
export class InvitePage {

  ponits: string = "20";
  invite_code: string;
  qrcode: any;
  file_name: string = 'invite_qrcode.png';


  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.invite_code = localStorage.getItem('custuser36id').toString().toUpperCase();
    console.log('this.invite_code==' + this.invite_code);
 
    // this.qrcode = 'assets/img/icon_erweima@2x.png';
    // this.qrcode = 'file:///data/data/com.redyouzi.diancall.cust/cache/tmp_mmexport1486105139376-560116172.jpg';
    this.createCode();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }

  

  createCode() {
    let content = constVar.register_url+"?custuser36id="+this.invite_code;
     console.log('content=='+content);
     
    (<any>window).Cordova.exec((res) => { 
      console.log('qrcode_path==' + res);
      this.qrcode = res;
      
    }, (err) => {let alerts=this.alertCtrl.create({title:' 二维码生成失败',buttons:["确定"]}); alerts.present();}, "BarcodeScanner", "encode", [{ "type": "PHONE_TYPE", "desString": content, "fileName": this.file_name,"hasLogo":"1","iconPath":"","size":"200", "errorRate":"0.3","color":"#fb6d07" }]);
  }
}
