import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController,AlertController} from 'ionic-angular';
import { ShopParticularsPage } from '../../pages/shop-particulars/shop-particulars'
import { HttpContents, HttpUrl, showToast, saveLoginInfo,globalVar} from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { constVar } from '../../common/global';
/*
  Generated class for the PreferentialModule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-preferential-module',
  templateUrl: 'preferential-module.html'
})
export class PreferentialModulePage {
storeName;
youhui;
custuserid;
youhuiquan=false;
liuliang=false;
liwu=false;
tonghua=false;
weikai=true;
huodong=false;
moneyneed=false;
shengyuquan=false;
contents={};
preferential_qrcode: any;
file_names:string;
erweima = 'assets/img/{16CF1D4C-D926-45A2-AE0C-3EB13BFF0EEB}.png';
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public viewCtrl: ModalController,public modalCtrl: ModalController,private http: HttpGet,
  ) {
    this.custuserid = localStorage.getItem('custuserid');
    this.storeName=this.navParams.data.key1;
    this.youhui=this.navParams.data.key2;
   
    // console.log('wode navParams===='+JSON.stringify(this.navParams.data.key2));
    console.log('wode youhui===='+JSON.stringify(this.youhui));
    // <!--youhuiquan liuliang liwu tonghua-->
    if(this.youhui.cashvalue==0 || this.youhui.cashvalue==undefined){
        this.youhuiquan=true;
    }else{
      this.youhui.cashvalue=this.youhui.cashvalue;
    };
    if(this.youhui.giftname==0 || this.youhui.giftname==undefined){
      this.liwu=true;
    };
    if(this.youhui.voicetimes==0 || this.youhui.voicetimes==undefined){
      this.tonghua=true;
    }else{
      this.youhui.voicetimes=this.youhui.voicetimes;
    };
    if(this.youhui.fluxpkgid==0 || this.youhui.fluxPackage.ydfluxkbs==undefined){
      this.liuliang=true;
    }else{
      this.youhui.fluxPackage.ydfluxkbs=this.youhui.fluxPackage.ydfluxkbs;
    };
    if(this.youhui.costmoneyneed==0 || this.youhui.costmoneyneed==undefined){
        this.moneyneed=true;
    }else{
        this.youhui.costmoneyneed=this.youhui.costmoneyneed;
    }
    if(this.youhui.maxcount==0 && this.youhui.usedcount==0){
        this.shengyuquan=false;
    }else{
      this.shengyuquan=true;
    }
    
    // this.contents='YHQ?storeid='+this.navParams.data.key2.storeid+'&quanid='+this.navParams.data.key2.quanid;
    this.contents=JSON.stringify({YHQ:{storeid:this.navParams.data.key2.storeid,quanid:this.navParams.data.key2.quanid,custuserid:this.custuserid}});
    // console.log('this.contents======'+JSON.stringify(this.contents));
    this.file_names='preferential_qrcode'+this.navParams.data.key2.quanid+'.png';
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferentialModulePage');
    if(this.navParams.data.key2.weikaishi==true && this.navParams.data.key2.kaishi==false){
        this.weikai=false;
        this.huodong=true;
    }else{
      this.weikai=true;
      this.huodong=false;
    }
     console.log('kaishi'+this.navParams.data.key2.weikaishi)
    this.sales()
  }
   
   presentProfileModal(event) {
     //点击阴影部分推出此页面
     let target = event.target || event.srcElement;
    if (typeof target.attributes["class"] != 'undefined') {
      if (target.attributes["class"].nodeValue != 'model') {
        this.navCtrl.pop();
      }
    } 
 }
 
sales(){
    console.log('二维码内容==========='+this.contents);
    console.log('二维码地址==========='+this.file_names);
    (<any>window).Cordova.exec((res) => { 
      console.log('qrcode_path==' + res);
      this.preferential_qrcode = res;
    }, (err) => {let alerts=this.alertCtrl.create({title:' 二维码生成失败',buttons:["确定"]}); alerts.present();}, 
    "BarcodeScanner", "encode", [{ "type": "PHONE_TYPE", "desString": this.contents,"fileName": this.file_names,"hasLogo":"1","iconPath":"","size":"200","errorRate":"0.3","color":"#fb6d07" }]);
}

}
