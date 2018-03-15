import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, saveLoginInfo } from '../../common/global';
import { GlobalProvider }from '../../providers/global-provider';
import { md5 } from '../../common/md5';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html'
})
export class ForgetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public globalProvider: GlobalProvider, private http: HttpGet) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }
  getOldCode(phone) {
    let dataParams = {
      mobile: phone
    }
    this.http.httpMethodContext(HttpUrl.getResetPswCode, dataParams, function (res,context) {
      // showToast(res.retinfo);
      if (res.retcode == 0) {
        showToast("短信发送成功！");
        console.log("短信发送成功！");

      } else {
        let alert=context.alertCtrl.create({
            title:res.retinfo,
            buttons:['确定']
          })
          alert.present();
        // alert(res.retinfo);
      }

    },this);
  }

  submmit(phone, code, new_psw, confirm_psw) {
    if (new_psw == confirm_psw) {
      let dataParams = {
        bean: {
          vercode: code,
          newpwd: md5(new_psw),
          account: phone
        }
      }
      this.http.httpMethodContext(HttpUrl.changePassword, dataParams, function (res,context) {

        // showToast(res.retinfo);
        if (res.retcode == 0) {
          showToast("密码修改成功！");
          console.log("密码修改成功！");
          saveLoginInfo(res);
          context.navCtrl.popToRoot();
        } else {
          let alert=context.alertCtrl.create({
            title:res.retinfo,
            buttons:['确定']
          })
          alert.present();
          // alert(res.retinfo);
        }

      },this);
    }
  }
}
