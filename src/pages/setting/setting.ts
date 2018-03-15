import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ChangePhonePage } from '../change-phone/change-phone';
import { ChangePasswordPage } from '../change-password/change-password';
import { SuggestionsPage } from '../suggestions/suggestions';
import { AboutDianCallPage } from '../about-dian-call/about-dian-call';
import { HttpContents, HttpUrl, showToast } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { TabsPage } from '../tabs/tabs';
import { GlobalProvider } from '../../providers/global-provider';
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  customer_service_number: string = '0755-8666-5265';
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private http: HttpGet, public globalProvider: GlobalProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  goNextPage(type) {
    let nextPage;
    switch (type) {
      case 'changePhone':
        nextPage = ChangePhonePage;
        break;
      case 'changeParssword':
        nextPage = ChangePasswordPage;
        break;
      case 'suggestions':
        nextPage = SuggestionsPage;
        break;
      case 'aboutDianCall':
        nextPage = AboutDianCallPage;
        break;
      default:
        break;
    }
    this.navCtrl.push(nextPage);
  }
  clearCache() {
    let confirm = this.alertCtrl.create({
      title: '缓存',
      message: '是否清除缓存?',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('agree clicked');
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();

  }
  logout() {
    let confirm = this.alertCtrl.create({
      title: '确定退出登录？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('111')
            this.http.httpMethod(HttpUrl.logout, {}, () => {

            console.log('222')

              localStorage.removeItem('custuserid');
              localStorage.removeItem('loginToken');
              localStorage.removeItem('custuser36id');
              localStorage.removeItem('skipLogin');

              this.navCtrl.push(TabsPage);
              showToast("退出登录成功！");
              console.log('退出登录成功！');
            });
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }
}
