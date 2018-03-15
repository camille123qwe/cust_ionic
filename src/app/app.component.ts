import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { initNative, initData, globalVar, initFunction, isLogin, HttpUrl, constVar } from '../common/global';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HotCodeLoadingPage } from '../pages/hot-code-loading/hot-code-loading';
import { HttpGet } from '../providers/http-get';
import { ShopDetailsPage } from '../pages/shop-details/shop-details';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = HotCodeLoadingPage;
  constructor(platform: Platform, private app: App, private http: HttpGet,private statusBar:StatusBar,private splashScreen:SplashScreen) {
    console.log('skipLogin==' + localStorage.getItem('skipLogin'));

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.hide();
      this.init();

    });
  }
  init() {
    if (globalVar.isDevice) {
      this.splashScreen.hide();
      (<any>window).navigator.splashscreen.hide();
      initNative();
      // let custuserid = localStorage.getItem('custuserid');
      // if (custuserid != null && custuserid != 'undefined') {
      // this.connect.connectYZX();
      // }
    }
    initData();
    initFunction();
    this.getBanners();
  }
  getBanners() {
    this.http.httpMethodContext(HttpUrl.welcomeImgs, {bean: { status: [10], type: 10 }}, (res, context) => {
      for (let i = 0; i < res.length; i++) {
        globalVar.welcomeImgs[i] = constVar.welcome_url + res[i]['imgsrc'];
      }
    }, this);

  }
}
