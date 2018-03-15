import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Tabs, App } from 'ionic-angular';
import { showToast, goLogin, HttpUrl, globalVar } from '../../common/global';
import { HomePage } from '../home/home';
import { FindPage } from '../find/find';
import { WebPage } from '../web/web';
import { LoginPage } from '../login/login';
import { TelephonePage } from '../call-modal/call-modal';
import { MePage } from '../me/me';
import { ParkPage } from '../park/park';
import { RegisterPage } from '../register/register';
import { xianShiYouHuiPage } from '../xianshiyouhui/xianshiyouhui';
import { xianShiShopPage } from '../xianshishop/xianshishop';
import { ZhaopinListPage } from '../zhaopin-list/zhaopin-list';
import { ShopParticularsPage } from '../shop-particulars/shop-particulars';
import { ShopDetailsPage } from '../shop-details/shop-details';
import { HttpGet } from '../../providers/http-get';
import { ZhaopinDetailsPage } from '../zhaopin-details/zhaopin-details';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('homeTabs') tabRef: Tabs;

  tab1Root: any = HomePage;
  tab2Root: any = ParkPage;
  tab3Root: any = MePage;
  tab4Root: any = FindPage;

  constructor(private navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public viewCtrl: ViewController, private app: App, private http: HttpGet) {
    console.log('TabsPage constructor()');
    // this.goOnePage();        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    // this.navCtrl.push(ZhaopinListPage);

  }
  ionViewDidEnter() {
    console.log(' TabsPage ionViewDidEnter()');
  }
  call() {
    // let modal = this.modalCtrl.create(TelephonePage);
    // modal.present();

    // 调原生拨打电话插件
    if (!goLogin(this, true)) {
      return;
    } else {
      (<any>window).Cordova.exec((res) => {
        console.log('call_plugin==' + JSON.stringify(res));

      }, (err) => { showToast('拨打电话功能暂不能使用！'); }, "RYZVoip", "direct", [{ "custuser36id": localStorage.getItem('custuser36id'), "callType": "yzx" }]);
    }

  }

  goOnePage() {
    if (!globalVar.isDevice) {
      console.log('no goOnePage');
      return;
    }
    console.log('goOnePage()');

    let context = this;
    (<any>window).Cordova.exec((res) => {
      context.onSuccessRyzSkip(res);
    }, (err) => { showToast('跳转失败'); }, "RyzSkip", "beginObserve");


  }
  onSuccessRyzSkip(res) {
    console.log('跳转插件返回结果::' + JSON.stringify(res));
    let params =JSON.parse(res);
    // console.log('pageName=='+params.pageName);
    // console.log('rushId=='+params.data.rushId);
    // console.log('params=='+JSON.stringify(params.data));
    // let params = { pageName: 'ShopParticularsPage', data: { store36id: 'evu4h', goods36id: '1njci0' } };
    // let data = JSON.parse(params.data);
    // console.log("跳转插件返回结果data=="+JSON.stringify(data));
    params.data.isOpenInstall = true;


    switch (params.pageName) {
      case 'ShopParticularsPage': 
        // data: { store36id: 'evu4h', goods36id: '1njci0' }
        let item, yhPrivilege, shopInfo, fenxiangzengnsong;


        let url = HttpUrl.aloneGoods + params.data['goods36id'];
        //goodsInfo
        this.http.httpMethodContext(url, {}, (res, context) => {
          //quan
          item = res;            //key1
          let url = HttpUrl.privilege + params.data['store36id'];

          this.http.httpMethodContext(url, {}, (res, context) => {
            //shopInfo
            yhPrivilege = res;  //key2

            this.http.httpMethodContext(HttpUrl.oneShopInfo + params.data['store36id'], {}, (res, context) => {
              res.followed = false;
              shopInfo = res;  //key3

              let url = HttpUrl.huoqurenwu + params.data['store36id'];
              this.http.httpMethodContext(url, {}, (res, context) => {
                fenxiangzengnsong = res; //key4
                this.navCtrl.push(ShopParticularsPage, { key1: item, key2: yhPrivilege, key3: shopInfo, key4: fenxiangzengnsong })
              }, this);

            }, this);

          }, this);


        }, this);




        break;
      case 'ZhaopinListPage':
        this.navCtrl.push(ZhaopinListPage);
        break;
      case 'ZhaopinDetailsPage':
        this.http.httpMethodContext(HttpUrl.jonbDetails, { bean: { jobid: params.data['jobId'] } }, (res, context) => {
          context.navCtrl.push(ZhaopinDetailsPage, res.result);
        }, this);
        break;
      case 'ShopDetailsPage':
        //  data: { store36id: 'evv0v' }
        this.http.httpMethodContext(HttpUrl.oneShopInfo + params.data['store36id'], {}, (res, context) => {
          res.followed = false;
          context.navCtrl.push(ShopDetailsPage, res);
        }, this);
        break;
      case 'xianShiShopPage':
        // data: {storeid:25000195,rushId:1505988615279}
        this.navCtrl.push(xianShiShopPage, params.data);
        break;
      case 'xianShiYouHuiPage':
        this.navCtrl.push(xianShiYouHuiPage);
        break;

      default:
        break;
    }
  }
}
