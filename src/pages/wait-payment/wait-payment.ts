import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController ,ModalController } from 'ionic-angular';
// import{ PaymentPage } from '../payment/payment'

/**
 * Generated class for the WaitPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wait-payment',
  templateUrl: 'wait-payment.html',
})
export class WaitPaymentPage {
  custgoodsorderid:Number;
  storeInfo={};
  custOrder2Goodses = [];
  totalgoodsprice:String;
  expressmoney:Number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:ActionSheetController,public modalCtrl: ModalController,) {

    this.custgoodsorderid = this.navParams.data.item.custgoodsorderid;
    this.storeInfo = this.navParams.data.item.storeInfo;
    this.expressmoney = this.navParams.data.item.expressmoney;
    this.totalgoodsprice = this.navParams.data.item.totalgoodsprice;
    this.custOrder2Goodses = this.navParams.data.item.custOrder2Goodses;
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitPaymentPage');
  }
  init(){
    console.log(this.storeInfo);

  }
  payment(){
    this.navCtrl.push('PaymentPage',{custgoodsorderid:this.custgoodsorderid,totalprice:this.totalgoodsprice});
  }
  
  // updateAddr(){
  //   console.log(0)
  //   let myModal = this.modalCtrl.create('MyAddressPage',{oder:true});
  //   myModal.present();
  // }
}
