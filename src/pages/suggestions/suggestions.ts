import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { SettingPage } from '../../pages/setting/setting'
@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html'
})
export class SuggestionsPage {

userid;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpGet,) {
     this.userid = localStorage.getItem('custuserid');
    // console.log("us ID========="+this.userid)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionsPage');
  }

  submmit(suggestion,userid){
    if(suggestion.length==0){
      showToast("请输入反馈内容");
    }else{
       let dataParams = {
      "bean": {
        "content": suggestion,
        "userid": userid,
        "usertype": 10,
      }
    }

    this.http.httpMethodContext(HttpUrl.retroaction, dataParams , function (res,context) {

      // console.log('反馈 =========== '+JSON.stringify(res))
      if(res.retcode==0){
        showToast("反馈成功");
        context.navCtrl.pop();
        // console.log(suggestion);
      }
    },this);
    console.log("suggestion_text=="+suggestion);
    }
   
  }
}
