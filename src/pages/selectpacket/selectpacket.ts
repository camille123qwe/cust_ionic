import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectpacketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-selectpacket',
  templateUrl: 'selectpacket.html',
})
export class SelectpacketPage {
  // ifmoneyneed 满**金额优惠
  // discountmoney 减钱
  // discountpercent 折扣
  // title 优惠标题
  discountlist;
  callback;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('data from page'+JSON.stringify(this.navParams.data.discountlist));
    this.discountlist = this.navParams.data.discountlist;
    this.callback    = this.navParams.get('callback'); // 回调
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectpacketPage');
  }

  sureclick(item){
    console.log('title'+item.title);
    if(item.usableThis == 1){
      this.callback(item).then(()=>{ this.navCtrl.pop() }); // 调用回调
    }else{
      console.log('select unable discount');
    }
      
  }

}
