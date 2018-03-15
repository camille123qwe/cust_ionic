import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { isLogin, HttpUrl, constVar,globalVar } from '../../common/global';
import { Http } from '@angular/http';
import { HttpGet } from '../../providers/http-get';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  banners: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, public _http: Http, private http: HttpGet) {
    this.banners = globalVar.welcomeImgs;
  }

  ionViewDidLoad() {
    // this.statusBar.hide();
    setTimeout(() => {
      if (!isLogin() && localStorage.getItem('skipLogin') != 'true') {
        this.app.getRootNav().setRoot(LoginPage);
      } else {
        this.app.getRootNav().setRoot(TabsPage);
      }
    }, 4000);
  }
  ionViewDidLeave() {
    // StatusBar.show();
  }
}
