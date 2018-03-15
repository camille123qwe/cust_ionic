import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, App, AlertController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, globalVar, constVar } from '../../common/global';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  weixin=false;
  zhifubao=false;
  huodaofukuan = false;
  paystatus:boolean;
  money ='';
  bankCardCount = 0;
  ordernum = 0;
  bankCardList = [];
  loading;
  isLoading = false;
  storeaddr = false;
  goodsorderid='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpGet, public modalCtrl: ModalController, public loadingCtrl: LoadingController, 
    public app: App, private alertCtrl: AlertController, ) {
    this.goodsorderid = this.navParams.get('custgoodsorderid');
    this.money = this.navParams.get('totalprice');
    // console.log("dd" + this.navParams.get('totalprice'));

    // console.log(JSON.stringify(this.navParams.data))

    console.log('PaymentPage==' + JSON.stringify(this.navParams.data));

  }
  
  queding() {
    console.log('weixin' + this.weixin + 'zhifubao'+ this.zhifubao);
    if(this.zhifubao==true && this.weixin==false){
      console.log('我选择了支付宝支付：');
      this.zhifubaopay();
    }else if(this.zhifubao==false && this.weixin==true){
      console.log('我选择了微信支付：');
      this.weixinpay();
    }else if(this.zhifubao==false && this.weixin==false){
      let alert = this.alertCtrl.create({
            title: '请选择支付方式',
            buttons: ['确定']
          })
          alert.present();
    }else if(this.zhifubao==true && this.weixin==true){
      let alert = this.alertCtrl.create({
            title: '操作有误',
            buttons: ['确定']
          })
          alert.present();
    }


  }
  payment(type){

    
    if(type == 'weixin' && this.weixin == true && this.zhifubao == true){
      this.zhifubao = false;
      this.weixin = true;
      console.log('我选择了微信支付： weixin == true ，zhifubao == true');
    }else if(type == 'zhifubao' && this.weixin == true && this.zhifubao == true){
      console.log('我选择了支付宝支付： weixin == true ，zhifubao == true');
      this.zhifubao = true;
      this.weixin = false;
    }
    console.log('weixin' + this.weixin + 'zhifubao'+ this.zhifubao);
 

    // //微信支付的点击判断
    // if(type == 'weixin'){
    //   this.zhifubao = false;
    //   this.weixin = true;
    //   console.log(type);
    // }else if(type == 'zhifubao'){
    //   this.zhifubao = true;
    //   this.weixin = false;
    //   console.log(type);
      
    // }
    

    
  }
 

  zhifubaopay() {
      this.isLoading = true;
      this.loading = this.loadingCtrl.create({
        content: '上传数据中...'
      });
      this.loading.present();
      setTimeout(() => {
        this.isLoading = false;
        this.loading.dismiss();
      }, 7000);
      let data = {
        bean: {
          payway: 30,
          paytype: 30,
          clientAddr: "192.168.1.128",
          payno: this.goodsorderid,
        }
      }
      this.http.httpMethodContext(HttpUrl['prepay'], data, function (res, context) {
        if (context.loading) {
          context.isLoading = false;
          context.loading.dismiss();
        }
        if (res.retcode == 0) {
          console.log(res);
          (<any>window).Cordova.exec((res) => {
            console.log('支付宝支付插件回调==' + res);
          }, (err) => { showToast('支付失败'); },
            "alipay", "payment", [{ "orderString": res.result, }]);
        }
      }, this)
  }

  weixinpay(){
      this.isLoading = true;
      this.loading = this.loadingCtrl.create({
        content: '上传数据中...'
      });
      this.loading.present();
      setTimeout(() => {
        this.isLoading = false;
        this.loading.dismiss();
      }, 7000);
      let data = {
        bean: {
          payway: 30,
          paytype: 20,
          clientAddr: "192.168.1.128",
          payno: this.goodsorderid,
        }
      }
      this.http.httpMethodContext(HttpUrl['prepay'], data, function (res, context) {
        if (context.loading) {
          context.isLoading = false;
          context.loading.dismiss();
        }
        if (res.retcode == 0) {
          let response = res.result;
            console.log('response==' + JSON.stringify(response));
              (<any>window).Cordova.exec((res) => {
                console.log('微信支付插件回调==' + res);
              }, (err) => { alert('支付失败'); }, "Wechat", "sendPaymentRequest", [{ "wxAppId": response.appId, "mch_id": response.mch_id, "prepayid": response.prepay_id, "noncestr": response.nonceStr, "timestamp": response.timeStamp, "sign": response.paySign }]);
        }
      }, this)
    }

}
