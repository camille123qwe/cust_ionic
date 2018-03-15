import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast,saveLoginInfo } from '../../common/global';
import { GlobalProvider }from '../../providers/global-provider';
import { md5 } from '../../common/md5';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet,public globalProvider: GlobalProvider, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  submmit(old_psw, new_psw, confirm_psw) {
    if (new_psw == confirm_psw) {
      let dataParams = {
        bean: {
          oldpwd: md5(old_psw),
          newpwd: md5(new_psw)
        }
      }
      this.http.httpMethodContext(HttpUrl.changePassword, dataParams, function (res,context) {

        // showToast(res.retinfo);
        if (res.retcode == 0) {
          showToast("密码修改成功！");
          console.log("密码修改成功！");
          saveLoginInfo(res);
          context.navCtrl.pop();
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
