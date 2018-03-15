import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController ,ActionSheetController,AlertController} from 'ionic-angular';
import { HttpUrl, showToast, isLogin, goLogin } from '../../common/global';
import { HttpGet } from "../../providers/http-get";
import { CityPickerDemoPage } from '../city-picker-demo/city-picker-demo'; 

/**
 * Generated class for the SelectaddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-selectaddress',
  templateUrl: 'selectaddress.html',
})
export class SelectaddressPage {
  
  myaddr = [];
  addrStatus=10;
  selectDefaultAdd = false;
  callback;
  constructor(public actionSheetCtrl: ActionSheetController,private alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private http: HttpGet, private app: App) {
    this.callback    = this.navParams.get('callback'); 
}

  manageAdd(){ 
    console.log('manageAdd push MyAddressPage');
    this.navCtrl.push('MyAddressPage');
  }
  ionViewDidEnter() {
    console.log('ionViewDidLoad MyAddressPage');
    this.chaxun();
  }
  addAddr() {
    this.navCtrl.push(CityPickerDemoPage,{page:"MyAddressPage"});
  }

  chaxun() {
    let data = {
        'bean':{
          custuserid:localStorage.getItem('custuserid'),
          status:[10,20]
        },'cols': '[""]'
    };
    this.http.httpMethodContext(HttpUrl['shipAddr'], data , (res, context) => {
      console.log(res);
      context.myaddr = res;
    }, this);

  }

  rmaddress(item,defaultorno){
    this.addrStatus=80
    this.updataItem(item,defaultorno)
  }

  updataItem(item,defaultorno) {
    let data = {
      'bean': { 
        custshippingaddressid:item.custshippingaddressid,
        custuserid: localStorage.getItem('custuserid'),
        status:this.addrStatus,
        defaultorno:defaultorno
      }, 'cols': '["status","defaultorno"]'
    };
    this.http.httpMethodContext(HttpUrl['myAddress'], data , (res, context) => {
      if(context.addrStatus==80){
        context.myaddr.splice(context.myaddr.indexOf(item), 1);
        showToast('地址删除成功')
        console.log('地址删除成功')
      }else if(context.addrStatus==10){
        showToast('设置成功')
        console.log('设置成功')
      }
    }, this);
  }

  selectAdd(item){
      this.callback(item).then(()=>{ this.navCtrl.pop() }); // 调用回调
  }

}
