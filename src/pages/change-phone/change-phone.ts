import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast } from '../../common/global';
import { GlobalProvider } from '../../providers/global-provider';

@Component({
  selector: 'page-change-phone',
  templateUrl: 'change-phone.html'
})
export class ChangePhonePage {
  code1 = {
    code_css: 'btnVerify',
    code_txt: '获取验证码',
    code_disable: false
  };
  code2 = {
    code_css: 'btnVerify',
    code_txt: '获取验证码',
    code_disable: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, public globalProvider: GlobalProvider, public alertCtrl: AlertController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePhonePage');
  }
  /**
 * 发送验证码按钮倒计时
 */
  changeCodeBtn = function (context) {
    context.code_css = 'btnVerifyInable';
    context.code_disable = true;
    let cont = 59;
    let interval = setInterval(() => {
      context.code_txt = cont+"秒";
      cont--;
      if (cont == 0) {
        context.code_css = 'btnVerify';
        context.code_txt = '获取验证码';
        
        context.code_disable = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  getOldCode() {
    this.changeCodeBtn(this.code1);
    this.http.httpMethodContext(HttpUrl.getOldSmsregcode, {}, function (res, context) {

      // showToast(res.retinfo);
      if (res.retcode == 0) {
        showToast("短信发送成功！");
        console.log("短信发送成功！");
      } else {
        let alert = context.alertCtrl.create({
          title: res.retinfo,
          buttons: ['确定']
        })
        alert.present();
        // alert(res.retinfo);
      }

    }, this);
  }
  getNewCode(new_phone) {
    if (new_phone.toString().length != 11) {
      showToast("手机号码不正确");
      return;
    }
    this.changeCodeBtn(this.code2);
    let url = HttpUrl.getSmsChangecode + "mobile:" + new_phone;
    this.http.httpMethod(url, {}, function (res) {

      // showToast(res.retinfo);
      if (res.retcode == 0) {
        showToast("短信发送成功！");
        console.log("短信发送成功！");
      } else {
        let alert = this.alertCtrl.create({
          title: res.retinfo,
          buttons: ['确定']
        })
        alert.present();
        // alert(res.retinfo);
      }

    });
  }
  submmit(old_code, new_phone, new_code) {
    let dataParams = {
      precode: old_code,
      vercode: new_code,
      mobile: new_phone
    }
    this.http.httpMethodContext(HttpUrl.updatePhone, dataParams, function (res, context) {

      // showToast(res.retinfo);
      if (res.retcode == 0) {
        showToast("手机号码修改成功！");
        console.log("手机号码修改成功！");
        context.navCtrl.pop();
      } else {
        let alert = context.alertCtrl.create({
          title: res.retinfo,
          buttons: ['确定']
        })
        alert.present();
        // alert(res.retinfo);
      }

    }, this);
  }

}
