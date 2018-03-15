import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ShopDetailsPage } from '../shop-details/shop-details';
import { NavController, App, NavParams, ModalController, Slides, AlertController, LoadingController, Platform } from 'ionic-angular';
import { CitySelectionPage } from '../city-selection/city-selection';
import { MessagesPage } from '../messages/messages';
import { MyPointsPage } from '../my-points/my-points';
import { MyVoucherPage } from '../my-voucher/my-voucher';
import { MyShopPage } from '../my-shop/my-shop';
import { WebPage } from '../web/web';
import { SearchShopPage } from '../search-shop/search-shop';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, constVar, globalVar, isLogin, goLogin } from '../../common/global';
import { LoginPage } from '../login/login';
import { GlobalProvider } from '../../providers/global-provider';
import { CardSettingPage } from '../../pages/card-setting/card-setting';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { xianShiYouHuiPage } from '../xianshiyouhui/xianshiyouhui';
import { ZhaopinListPage } from '../zhaopin-list/zhaopin-list';
import { xianShiShopPage } from '../xianshishop/xianshishop';
import * as $ from 'jquery';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  myInput: string = '';
  select_city: string = '';
  grid;
  ads;
  ads2;
  Val;
  val;
  userid;
  wodeshuliang = true;
  status = [10];
  center_banner;
  img_class: string = 'small_img_class';
  city_page = CitySelectionPage;
  lunbo2 = 'assets/img/banner_sides2.png';
  shousuo_img = 'assets/img/shouye_shousuo-1@2x.png';
  ads_big = "assets/img/sy_imge_1@2x.png";
  ads_small_1 = "assets/img/sy_imge_2@2x.png";
  ads_small_2 = "assets/img/sy_imge_3@2x.png";
  sy_banner = "assets/img/sy_banner_qiandao@2x.png";
  jinxuan = "assets/img/sy_banner_jingxuan@2x.png";
  there1 = "assets/img/mmeaclmsmvcq1cjf3l8dfg6qh.jpg";
  there2 = "assets/img/himagm4trd01e1t.jpg";
  choujiang='assets/img/button_choujiang@2x.png';
  icon_cainixihuan = "assets/img/icon_cainixihuan@2x.png";
  icon_gengxin = "assets/img/icon_gengxin@2x.png";
  fistNews = { title: '', url: '' };
  guessLikeShops = [];
  storefaceurl_300 = constVar.storefaceurl_300;
  goodsface_900=constVar.goodsfaceurl_900;
  isFirstIn = true;
  mapArr = [];
  youhui;
  maparen;
  mapitem;
  fujinmendian = false;
  dingweishibai = false;
  askSucess: boolean = true;
  flipper_page = 0;
  limit = 20;
  total = 0;
  infiniteScroll;

  hot_img = 'assets/img/icon_hot.png';
  shopcar = 'assets/img/icon_sy_gouwuche@2x.png';
  slide_img = 'slide_img';
  wodeyouhui = { id: "youhui", img: "assets/img/icon_wodedaijinquan@2x_1.png", txt: "我的优惠", number: 0, youhuishow: true, };
  xianshiyouhui = { id: "nearby", img: "assets/img/icon_xianshiyouhui@2x.png", txt: "附近门店", number: 0, xianshi: true, };
  zhaopin = { id: "zhaopin", img: "assets/img/icon_zhaopinxinxi@2x.png", txt: "招聘信息" };
  myoder = { id: "oder", img: "assets/img/icon_wodexiaoxi@2x.png", txt: "我的订单" }
  wodemendian = { id: "mendian", img: "assets/img/icon_changqudianpu@2x.png", txt: "常去店铺", number: 0, mendianshow: true, };
  loadingShops = false;
  banners: any[] = [{ imgsrc: 'assets/img/banner_sides2.png', relativestoreid: 0, rushid: 0 }];
  loading;
  rushlist = [];
  rushtime: number;
  rushtimes = '';
  goodsface_300 = constVar.goodsfaceurl_300;
  scrollShow: boolean;
  onlineVersion;
  localVersion;
  isIOS = false;
  scrolltimes:boolean;
  giftName = [];
  jihui = 100;
  systemMessages=[];
  hotGoodRows = [];
  constructor(public navCtrl: NavController, private app: App, public params: NavParams, public globalProvider: GlobalProvider, public navParams: NavParams,
    public modalCtrl: ModalController, private http: HttpGet, public cd: ChangeDetectorRef, private alertCtrl: AlertController, public _http: Http,
    private loadingCtrl: LoadingController, public platform: Platform, private iab: InAppBrowser) {
    this.userid = localStorage.getItem('custuserid');
    this.ads = [{ img: "assets/img/sy_imge2@2x.png" }, { img: "assets/img/sy_imge3@2x.png" },];
    this.ads2 = [{ img: "assets/img/sy_imge1@2x.png" }, { img: "assets/img/sy_imge2@2x.png" },];
    this.center_banner = "assets/img/bg_banner@2x.png";
    this.isIOS = platform.is('ios');
    this.getBanners();
    this.guesslike();
    this.notification();
    
    if (this.platform.is('ios')) {
      this.slide_img = 'top-slide-img'
    }
    // this.banners = globalVar.home_banners;
    
    
  }

  //自定义marquee
  marquee(){
    let data={
      'bean':{
        status:	[10],	
      }
      
    }
    this.http.httpMethodContext(HttpUrl.notification, data, (res, context) => {
      
      context.systemMessages=res;
      if(res){
        
        let Mar = $("#marquees"); 
        let child_div=Mar.children("span");
        let picH = 44*res.length+20*res.length;
        console.log('systemMessages=='+picH)
        let tmpH = 0; 
        // Mar.innerHTML += Mar.innerHTML; 
        setInterval(() => {
          if(tmpH < picH){ 
            tmpH ++; 
            if(tmpH > picH ){
              tmpH = picH
            }; 
            Mar.scrollTop(tmpH)
        }
        else{ 
            tmpH = 0; 
            Mar.append(child_div[0]);
            Mar.scrollTop(0)
        }
        }, 5000/44)
        // context.start(Mar,picH,tmpH,child_div);
      }
      // console.log('systemMessages=='+context.systemMessages.length)
      
    },this)
    console.log('1010101010010='+this.systemMessages.length)
   
  }
//   start(Mar,picH,tmpH,child_div ){
//     setInterval(() => {
//       if(tmpH < picH){ 
//         tmpH +=2; 
//         if(tmpH > picH ){
//           tmpH = picH
//         }; 
//         Mar.scrollTop(tmpH)
//     }
//     else{ 
//         tmpH = 0; 
//         Mar.append(child_div[0]);
//         Mar.scrollTop(0)
//     }
//     }, 5000/34)
// }

  // ionViewDidLoad() {

  //   // console.log('res.length===============' + this.youhui)
  //   console.log('ionViewDidEnter HomePage');
  //   if (isLogin() && globalVar.isbubble == false) {
  //     this.gridNum();
  //   } else {
  //     this.wodeyouhui.youhuishow = true;

  //   }
  // this.grid = [
  //   // { id: "xiaoxi", img: "assets/img/icon_wodexiaoxi@2x.png", txt: "我的消息" },
  //   // { id: "jifen", img: "assets/img/icon_wodejifen@2x.png", txt: "我的积分" },
  //   { id: "youhui", img: "assets/img/icon_wodeyouhui@2x.png", txt: "我的优惠", number: 0, },
  //   { id: "mendian", img: "assets/img/icon_changqudianpu@2x.png", txt: "我的门店", number: 0 }];
  //   this.ads = [{ img: "assets/img/sy_imge2@2x.png" }, { img: "assets/img/sy_imge3@2x.png" },];
  //   this.ads2 = [{ img: "assets/img/sy_imge1@2x.png" }, { img: "assets/img/sy_imge2@2x.png" },];
  //   this.center_banner = "assets/img/bg_banner@2x.png";
  //   // this.select_city = '城市';
  // "rushendtime":1511280000000
  //   if (globalVar.isDevice) {
  //     this.getLocation(this);
  //     // this.location(this);
  //   } else {
  //     this.getGuessLikeShop(this.infiniteScroll);
  //   }

  //   // let params = this.navParams.get('select_city');
  //   // if (typeof (params) == 'undefined') {
  //   //   this.select_city = '城市';
  //   // } else {
  //   //   this.select_city = params;
  //   // }
  //   // console.log('select_city==' + this.select_city);


  //   // this.zhoubian();


  // }

  // 消息轮播
  notification(){
    let data={
      'bean':{
        status:	[10],	
      }
      
    }
    this.http.httpMethodContext(HttpUrl.notification, data, (res, context) => {
      
      context.systemMessages=res;
      console.log('systemMessages=='+context.systemMessages.length)
    },this)
  }
  rushindex() {
    let data = {
      'bean': {
        status: 20,
      }
    }
    this.http.httpMethodContext(HttpUrl.rushindex, data, (res, context) => {
      // console.log('res===34535'+JSON.stringify(res))

      if (typeof (res) == 'undefined' || res.length == 0 || res == '') {
        this.scrollShow = false
      } else {
        this.scrollShow = true;
        context.rushlist = res;
        for (let i = 0; i < context.rushlist.length; i++) {
          context.rushtime = context.rushlist[0].rushendtime;
        }
      }


    }, this)
  }

  formatDuring(mss) {

    mss = mss - (new Date().getTime());
    if (mss < 0) {
      this.rushtimes = '抢购时间结束'
    } else {

      let days = Math.floor(mss / (1000 * 60 * 60 * 24));
      let hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((mss % (1000 * 60)) / 1000);
      this.rushtimes = days + " 天 " + hours + " 小时 " + minutes + " 分" + seconds + "秒";
      if(isNaN(days)){
        this.scrolltimes=false
      }else{
        if(this.scrollShow){
          this.scrolltimes=true
        }else{
          this.scrolltimes=false
        }
      }
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidEnter()home');
    
    // let list=(document.getElementById('home_ion_list').innerText);
    let timepiece = setInterval(() => {
      if (this.guessLikeShops.length == 0 && this.askSucess == true) {
        this.dingweishibai = true;
        clearInterval(timepiece);
      } else {
        this.dingweishibai = false;
        clearInterval(timepiece);
      }
      console.log('listlistlistlist==' + JSON.stringify(this.askSucess));
    }, 6000);
    setInterval(() => {
      this.formatDuring(this.rushtime);
      
    }, 1000)
    // this.marquee();
    // this.checkVersion();
  }

  checkVersion() {
    // local app Version
    if (globalVar.isDevice) { // 通过插件获取版本号
      (<any>window).Cordova.exec((res) => {
        console.log('get app version'+JSON.stringify(res));
        this.localVersion = res.buildVersion;
        this.httpGetVersion(res.buildVersion);
      }, (err) => { showToast('版本获取失败'); }, "RyzAppVersion", "getAppVersion", []);
    }

    
  }

  httpGetVersion(version) {
    // 通过接口获取版本号
    let dataParams = {
      "bean": {
        clienttype: 'ios',
        platform: 'B2C',
        status: [10],
      },
    }

    this.http.httpMethodContext(HttpUrl.version, dataParams, (res, context) => {
      console.log('HTTP appVersion' + JSON.stringify(res[0]));
      context.onlineVersion = res[0].version; // online Version

      console.log('localVersion==' + version + 'onlineVersion==' + context.onlineVersion);
      if (version != context.onlineVersion) { // not latestVersion 
        this.platform.ready().then(() => {
          let alert = this.alertCtrl.create({
      title: '已检查到最新版本，您是否要更新？',
      cssClass: 'alertmodal',
      buttons: [
        {
          text: '确认',
          role: 'cancel',
          handler: data => {
            if (this.isIOS) {
            console.log('ios download');
            const browser = this.iab.create('https://itunes.apple.com/cn/app/%E5%BA%97%E5%91%BC/id1192703467?mt=8','_system');
          } else {
            console.log('android download');
            const browser = this.iab.create('http://c.diancall.com/app/android/diancall-cust.apk','_system');
          }
            console.log('click Sure');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
          
        });
      } else {
        console.log('the version is latest! thank you');
      }
    }, this);
  }

  refreshData() {
    // this.appPreferences.fetch('key').then((res) => { console.log(res); });
    console.log('refreshData()');
    if (isLogin() && globalVar.isbubble == false) {
      this.gridNum();
    } else {
      this.wodeyouhui.youhuishow = true;
    }
    // console.log('refreshData()==' + JSON.stringify(globalVar.location.latitude));


    if (globalVar.isDevice && globalVar.location.latitude == '') {
      console.log('开始定位');
      this.getLocation(this);
      // let context = this;
      // let interval = setInterval(() => {
      //   console.log('循环定位');
      //   if (globalVar.location.latitude == '') {
      //     context.getLocation(context);
      //   } else {
      //     clearInterval(interval);
      //   }

      // }, 3000);

      // this.location(this);
    } else {
      console.log('直接获取附近门店');
      this.setCity(globalVar.location.city);
      // this.getGuessLikeShop(this.infiniteScroll);
    }
    // this.zhoubian();    
  }

  getBanners() {
    //  
    let data = {
      bean: {
        status: [10],
        type: 10
      }
    }
    this.http.httpMethodContext(HttpUrl.getBanners, data, (res, context) => {
      // [{"bannerid":10000001,"createtime":1506593440400,"endtime":1506873599999,"imgsrc":"7chm80q3989i5gg12q3b4cuc2n.jpg","relativestoreid":25000473,"rushid":0,"starttime":1506614400000,"status":10,"storeName":"泥大爷 泥大妈的妈","type":10,"validday":3}]
      console.log('getBanners res==' + JSON.stringify(res));
      if (res.length > 0) {
        context.banners = [];
        for (let i = 0; i < res.length; i++) {
          res[i].imgsrc = constVar.banner_url + res[i].imgsrc;
        }
        context.banners = res;
        console.log('this.banners' + JSON.stringify(context.banners))
      } else {
        context.banners = [{ imgsrc: 'assets/img/banner_sides2.png', relativestoreid: 0, rushid: 0 }];
      }
      //  =res;

      console.log('getBanners res==' + context.banners);

    }, this);
  }

  onBannerClick(item) {
    console.log(JSON.stringify(item));
    if (!goLogin(this)) {
      return;
    }

    // let name = url.substring(url.indexOf('banner/') + 7, url.length - 4);
    // console.log('name=' + name);
    item.relativestoreid;
    item.followed = false;
    console.log('item==' + JSON.stringify(item));
    if (item.relativestoreid !== 0 && item.rushid == 0) {

      let url = HttpUrl.oneShopInfo + item.relativestoreid.toString(36)
      this.http.httpMethodContext(url, {}, (res, context) => {
        this.navCtrl.push(ShopDetailsPage, res);
      }, this)
      console.log(item.rushid);
      console.log('if');
    } else if (item.relativestoreid == 0 && item.rushid == 0) {
      console.log('')
    } else {
      let data = { storeid: item.relativestoreid, rushid: item.rushid }
      this.navCtrl.push(xianShiShopPage, data);
    }
  }

  godelivery() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      this.navCtrl.push('HomeDeliveryDetailPage');
    }
    // this.navCtrl.push('HomeDeliveryPage');


  }
  baycar() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      this.navCtrl.push('ShopCarPage');
    }

  }
  ionViewDidEnter() {
    // console.log('ionViewDidEnter()home');
    
    this.refreshData();
    this.rushindex();
    this.cdaward();
  }

  /**
   * 右上角地图显示周边门店
   */
  zhoubian() {
    this.http.httpMethodContext(HttpUrl.arroundShops, {}, (res, context) => {

      context.maparen = res.rows;
      for (let i = 0; i < context.maparen.length; i++) {
        let storeaddr = context.maparen[i].storeaddr;
        let storename = context.maparen[i].storename;
        let longitude = context.maparen[i].longitude;
        let latitude = context.maparen[i].latitude;
        let storeid = context.maparen[i].storeid;
        context.mapArr.push({ 'title': storeaddr, 'subtitle': storename + storeid, 'latitude': latitude, 'longtitude': longitude });


      }
      // console.log('周边门店' + JSON.stringify(context.mapArr))
    }, this);
  }


  // getFirstNews() {

  //   this.http.httpMethodContext(HttpUrl.firstNews, {}, (res, context) => {
  //     context.fistNews.title = res.title;
  //     context.fistNews.url = res.newsurl;
  //   }, this);
  // }

  goSignIn() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      this.navCtrl.push('SignInPage')
    }

  }
  gengduo() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      this.navCtrl.push(xianShiYouHuiPage)
    }

  }
  // 加载猜你喜欢页面的图片
  guesslike() {
    
 
this.http.httpMethodContext(HttpUrl.guessLike,{}, (res, context) => {
 
   console.log("response  === "+ JSON.stringify(res));
   //console.log("长度  === "+ res.length);
   if (res.length <= 6) {
     let newarry = [];
     for (let i = 0; i < res.length; i += 2) {
       newarry.push(res.slice(i, i + 2));
     }
     this.hotGoodRows = newarry;
     console.log("hotGoodRows  === "+ JSON.stringify(this.hotGoodRows));

   } else {
     let goodsRows = res;
     let num = 6;
     context.getArrayItems(goodsRows, num);
   }
  
 }, this)

}


//更新猜你喜欢的商品


//跳转详情页面
goDetailPage(item){
 console.log(JSON.stringify(item))
   
   this.goodsDetail(item)
}
goodsDetail(item) {
 //console.log( "item === " + JSON.stringify(item));
 let url = HttpUrl.oneShopInfo + item.storeid.toString(36);
 this.http.httpMethodContext(url, {}, (res, context) => {
   let params={goodsInfo:item,storeInfo:res}
   // if(res.){

   // }
   console.log( "item === " + JSON.stringify(item) + ",res == " + JSON.stringify(res));
   context.navCtrl.push('GoodsxiangqingPage',params);
 }, this)
}
  goRush(item) {
    console.log(JSON.stringify(item))

    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      this.navCtrl.push(xianShiShopPage, item);
    }

  }

  getGuessLikeShop(infiniteScroll) {
    this.loadingShops = true;
    //     [{ "city": "深圳市", "createtime": 1486536440817, "custusercount": 0, "distance": 0, "goodsradio": 53, "latitude": 22.549255, "longitude": 113.965406, "merchid": 30000002, "status": 10, "store36id": "evu4h", "storeaddr": "尚美科技大厦", "storeface": "31jtp1r2q2qpemjs2lu1pbm8rk.jpg", "storeid": 25000001, "storeimgs": "0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg", "storeman": "张生", "storename": "尚美酒店大冲测试点" }]

    // let dataParams = {
    // "bean": {
    //   longitude: globalVar.location.longitude,
    //   latitude: globalVar.location.latitude,
    //   city: globalVar.location.city,
    //   storename: this.myInput,
    //   status:this.status,
    // },
    // "flipper": {
    //   limit: 20,
    //   offset: 20,
    // }
    // }

    let data = {
      bean: {
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city,
      },
      flipper: {
        offset: this.flipper_page,
        limit: 20,
      }
    }
    // this.http.httpMethodContext(HttpUrl.guessLikeShop, dataParams, (res, context) => {
    this.http.httpMethodContext(HttpUrl.arroundShops, data, (res, context) => {
      context.loadingShops = false;
      if (this.loading) {
        this.loading.dismiss();
      }
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }

      this.total = res.total;
      console.log('距离1=====' + JSON.stringify(res.rows.length));
      for (let item of res.rows) {

        if (item.buycount == 0) {
          item.Val = true;
        } else {
          item.Val = false;
        };
        if (item.goodscount == 0) {
          item.val = true;
        } else {
          item.val = false;
        };

        if (item.distance == 0) {
          item.distance = '';
        } else if (item.distance <= 1000) {

          item.distance = "<" + 10 + "m";

        } else if (item.distance >= 100000) {

          item.distance = Math.floor(item.distance / 1000) / 100 + "km"

        } else {

          item.distance = Math.floor(item.distance / 100) + "m";

        }
      }


      if (context.flipper_page == 0) {
        context.guessLikeShops = res.rows;
        console.log('距离2===' + JSON.stringify(context.flipper_page))
        console.log('push之后' + context.guessLikeShops.length);
      } else {
        for (let item of res.rows) {
          context.guessLikeShops.push(item);
        }
        console.log('距离2===' + JSON.stringify(context.flipper_page))
        console.log('push之后' + context.guessLikeShops.length)
      }

      // context.guessLikeShops = res.rows;
      if (typeof (context.guessLikeShops) == 'undefined' || context.guessLikeShops.length == 0) {
        context.askSucess = false;
        context.fujinmendian = true;
        context.dingweishibai = false;
      } else {
        context.askSucess = true;
        context.fujinmendian = false;
        context.dingweishibai = false;
      }

      // context.fistNews.title = res.title;
      // context.fistNews.url = res.newsurl;
      this.cd.detectChanges();
    }, this);


  }

  goNewsDetails() {
    this.navCtrl.push(WebPage, {
      title: '新闻',
      url: this.fistNews.url

    });
  }
  onSearchInput(event) {

    this.navCtrl.push(SearchShopPage, this.guessLikeShops)
    // let modal = this.modalCtrl.create(SearchShopPage);
    // modal.onDidDismiss(
    //   data => {
    //   }
    // );
    // modal.present();
  }

  presentPrompt() {
    globalVar.govoucher = true;
    if (!goLogin(this)) {
      return;
    }
    let alert = this.alertCtrl.create({
      title: '请输入需要添加的优惠券密码',
      cssClass: 'alertmodal',
      inputs: [
        {
          name: 'data',
        }
      ],
      buttons: [
        {
          text: '确认',
          role: 'cancel',
          handler: data => {
            let DtatTest = data.data;
            console.log('输入的密码' + data.data)
            this.chaxun(DtatTest);
            console.log('Cancel clicked');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();

  }
  govoucherPage() {
    if (globalVar.govoucher == false) {
      this.navCtrl.push(MyVoucherPage);
    };
  }
  card_setting(res) {
    let myModal = this.modalCtrl.create(CardSettingPage, res);
    myModal.onDidDismiss(data => {
      this.govoucherPage();
    });
    myModal.present();
  }
  chaxun(DtatTest) {
    let url = HttpUrl.findCar + DtatTest;

    this.http.httpMethodContext(url, {}, (res, context) => {
      console.log('res=======' + res)
      if (res !== null) {
        context.card_setting(res);
        // console.log('wo de  ka ===' + JSON.stringify(res));
      } else {
        let alert = context.alertCtrl.create({
          title: '输入的密码不正确',
          buttons: ['确定']
        })
        alert.present();
      }

    }, this)
  }
  // ////////////////
  obserAnotationClick(maparen) {
    console.log('this.mapArr===' + JSON.stringify(this.mapArr));

    (<any>window).Cordova.exec((res) => {
      let shopID = res;
      let j;
      for (let i = 0; i < maparen.length; i++) {
        j = maparen[i];
        //找到匹配相同id 的对象
        if (shopID == j.storeid) {
          console.log('jjjj=' + JSON.stringify(j))
          this.mapitem = j;
        }
      };

      //添加页面
      this.app.getRootNav().push(ShopDetailsPage, this.mapitem);
    }, (err) => { showToast('跳转门店失败'); }, "BDLocation", "obserAnotationClick");
    this.location();
  }

  location() {

    // console.log(JSON.stringify(this.mapArr));

    (<any>window).Cordova.exec((res) => {

    }, (err) => { showToast('地图展示失败'); }, "BDLocation", "showMap", this.mapArr);

  }





  getLocation(context) {
    // 定位=={"city":"深圳市","longitude":113.9656,"latitude":22.54926}
    console.log('getLocation()');
    (<any>window).Cordova.exec((res) => {
      // alert('定位===================' + JSON.stringify(res));
      // context.select_city = res.city;
      context.setCity(res.city);
      globalVar.location.latitude = res.latitude;
      globalVar.location.longitude = res.longitude;
      globalVar.location.city = res.city;
      this.isFirstIn = false;
      let location_storage = { city: res.city, latitude: res.latitude, longitude: res.longitude };
      console.log('location_storage==' + JSON.stringify(location_storage));
      localStorage.setItem('location', JSON.stringify(location_storage));

      // context.getGuessLikeShop();
      this.fujinmendian = false;
      this.dingweishibai = false;

    }, (err) => { showToast('定位失败'); this.dingweishibai = true; this.fujinmendian = false; }, "BDLocation", "getLocation", ["Hight_Accuracy", "bd09ll", 0, false, true, false]);
  }

  setCity(city) {
    this.select_city = city;
    this.cd.detectChanges();
  }
  selectCity() {
    let modal = this.modalCtrl.create(CitySelectionPage);
    modal.onDidDismiss(data => {
      let params = data.select_city;
      if (typeof (params) !== 'undefined') {
        this.select_city = params;
      }
      // console.log('select_city==' + this.select_city);
    });
    modal.present();

  }
  goNextPage(id, youhui) {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      let nextPage;
      switch (id) {
        // case 'xiaoxi':
        //   nextPage = MessagesPage;
        //   break;
        case 'nearby':
          nextPage = 'NearbyStorePage';
          break;
        case 'xianshiyouhui':
          nextPage = xianShiYouHuiPage;
          break;
        case 'youhui':
          this.wodeyouhui.youhuishow = true;
          globalVar.isbubble = true;
          nextPage = MyVoucherPage;
          break;
        case 'mendian':
          nextPage = MyShopPage;
          break;
        case 'zhaopin':
          nextPage = ZhaopinListPage;
          break;
        case 'oder':
          nextPage = 'OrderOfGoodsPage';
        default:
          break;

      }
      this.app.getRootNav().push(nextPage, youhui);
    }
  }
  myShopOnClick() {
    // let custuserid = localStorage.getItem('custuserid');
    // if (custuserid == null || custuserid === 'undefined') {
    //   console.log('未登录');
    //   this.navCtrl.push(LoginPage, {});
    //   return false;
    // } else {
    //   // this.navCtrl.push('NearbyStorePage')
      this.app.getRootNav().push('ActivityPage')
    // }

  }
  //抽奖
  cdaward() {
    console.log(666)
    let data = {
      'bean': {
        status: [10]
      }
    }
    // for(let item of aaa.rows){
    //   console.log('title==='+item.awardtitle+';----detail'+item.awarddetail)
    // }
    // VM13553:2 title===四等奖;----detail全国流量1G&60分钟通话&小喵喵一只
    // VM13553:2 title===五等奖;----detail60分钟通话&豆油一桶
    // VM13553:2 title===参与鼓励奖;----detail一坨花生
    // VM13553:2 title===再接再厉哦;----detail啥也没有
    // VM13553:2 title===三等奖;----detail可爱的‘兔叽’
    // VM13553:2 title===二等奖;----detail天线宝宝
    // VM13553:2 title===一等奖;----detail油烟机
    // VM13553:2 title===特等奖;----detail大熊猫
    this.http.httpMethodContext(HttpUrl.cdaward, data, (res, context) => {
      context.giftName=[];
      console.log('奖品' + JSON.stringify(res));
      for (let item of res.rows) {

        context.giftName.push({'awardtitle':item.awardtitle,'awarddetail':item.awarddetail,'cdrawardid':item.cdrawardid});

      }
      console.log('xxx==' + JSON.stringify(context.giftName));
    }, this)
  }
  goTurntable() {
    // let giftNames = ["全国流量500M", "0分钟通话", "全国流量30", "猪肉丝"]
    // let gif=["10000001", "10000002", "10000003", "10000004", "10000005", "10000006",]
    
      this.navCtrl.push('TurntablePage', { 'gift': this.giftName, 'restcdrcount': this.jihui })
    
    
  }
  refreshAgain() {
    //使用上次定位数据进行刷新
    if (this.loadingShops) {
      console.log('正在加载，请稍后...');
      return;
    }
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.loadingShops = false;
      this.loading.dismiss();
  
  
    }, 5000);
    console.log('lastLocation==' + localStorage.getItem('location'));
    if (typeof localStorage.getItem('location') == 'undefined' || localStorage.getItem('location') == null) {
      globalVar.location.latitude = '';
      globalVar.location.longitude = '';
      globalVar.location.city = '';
    } else {
      let last_location = JSON.parse(localStorage.getItem('location'));
      globalVar.location.latitude = last_location.latitude;
      globalVar.location.longitude = last_location.longitude;
      globalVar.location.city = last_location.city;
    }
    console.log('LastCity==' + globalVar.location.city);
    console.log('直接获取附近门店');
    this.setCity(globalVar.location.city);
    // this.getGuessLikeShop(this.infiniteScroll);
  }
  gridNum() {

    let dataParams = {
      "bean": {
        merchid: '',
        storeid: '',
        custuserid: localStorage.getItem('custuserid'),
        status: 10,
      },
    }

    this.http.httpMethodContext(HttpUrl.quanList, dataParams, (res, context) => {
      // console.log('res的长度 length=====================' + JSON.stringify(res));
      context.youhui = res.result;
      for (let i = 0; i < context.youhui.length; i++) {
        if (context.youhui[i].validday == 0) {
          context.youhui[i].validday = "长期有效";
        } else {
          let newDate1: any = new Date();
          newDate1.setTime(context.youhui[i].starttime);
          let start = newDate1.format('yyyy-MM-dd');
          let newDate2: any = new Date();
          newDate2.setTime(context.youhui[i].endtime);
          let end = newDate2.format('yyyy-MM-dd');
          context.youhui[i].validday = end;
        }
      };
      this.wodeyouhui.number = context.youhui.length;
      if (context.youhui.length == 0 || this.wodeyouhui.number == 0 || typeof (context.youhui.length) == 'undefined' && globalVar.isbubble == false) {
        this.wodeyouhui.youhuishow = true;
      } else {
        this.wodeyouhui.youhuishow = false;
      }

    }, this);
  }

  // goNewsPage() {
  //   this.app.getRootNav().push(WebPage, {
  //     title: '头条新闻',
  //     url: 'http://m.news.baidu.com/news?fr=mohome&ssid=0&from=844b&uid=&pu=sz%401320_2001%2Cta%40iphone_1_9.1_3_601&bd_page_type=1#/?_k=kuj672'
  //   });
  // }

  getShopDetails(item) {
    item.followed = false;
    this.app.getRootNav().push(ShopDetailsPage, item);
  }


  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.flipper_page + this.limit < this.total && !this.loadingShops) {
      console.log('加载更多...');
      this.flipper_page += this.limit;
      console.log('flipper_page==' + this.flipper_page);
      // this.getGuessLikeShop(infiniteScroll);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
      console.log(this.total)
    }

  }

}
