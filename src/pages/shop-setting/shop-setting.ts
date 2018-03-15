import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast } from '../../common/global';

@Component({
  selector: 'page-shop-setting',
  templateUrl: 'shop-setting.html'
})
export class ShopSettingPage {
  title: string = "";
  openPush: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopSettingPage');
    this.title = this.navParams.data.title;
  }

  // ionViewWillLeave() {
  //   if (this.openPush) {
  //     this.allowPush();
  //   } else {
  //     this.forbitPush();
  //   }
  // }

  allowPush() {
    let url = HttpUrl.shopAllowPush + '';   //#	int	门店36ID
    this.http.httpMethodContext(url, {}, (res, context) => {

    }, this);
  }
  forbitPush() {
    let url = HttpUrl.shopForbitPush + '';   //#	int	门店36ID
    this.http.httpMethodContext(url, {}, (res, context) => {

    }, this);
  }
}
