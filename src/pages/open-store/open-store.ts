import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-open-store',
  templateUrl: 'open-store.html',
  providers: [InAppBrowser]
})
export class OpenStorePage {
  logoSrc = "assets/img/logo_imge_1@2x.png";
  isIOS = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform, private iab: InAppBrowser) {
    this.isIOS = plt.is('ios');
    console.log('this.isIOS==' + this.isIOS);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenStorePage');
  }
  download() {
    this.plt.ready().then(() => {
      if (this.isIOS) {
        // let iab =(<any>window).cordova.InAppBrowser;
        // iab.open('http://www.diancall.com/', '_system');
        console.log('ios download');
        const browser = this.iab.create('https://itunes.apple.com/cn/app/%E5%BA%97%E5%91%BC%E5%95%86%E5%AE%B6%E7%89%88/id1214778528?mt=8', '_system');
      } else {
        console.log('android download');
        const browser = this.iab.create('http://b.diancall.com/app/android/diancall-merch.apk', '_system');

      }
    });

  }
}
