import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ShopDetailsPage } from '../shop-details/shop-details';
import { IonicPage,NavController, App, NavParams, ModalController, Slides, AlertController, LoadingController, Platform } from 'ionic-angular';
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
import { xianShiYouHuiPage } from '../xianshiyouhui/xianshiyouhui';
import { ZhaopinListPage } from '../zhaopin-list/zhaopin-list';
@IonicPage()
@Component({
  selector: 'page-nearby-store',
  templateUrl: 'nearby-store.html',
})
export class NearbyStorePage {
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
  fistNews = { title: '', url: '' };
  guessLikeShops = [];
  storefaceurl_300 = constVar.storefaceurl_300;
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

  slide_img = 'slide_img';
  wodeyouhui = { id: "youhui", img: "assets/img/icon_wodedaijinquan@2x_1.png", txt: "我的优惠", number: 0, youhuishow: true, };
  xianshiyouhui = { id: "nearby", img: "assets/img/icon_xianshiyouhui@2x.png", txt: "附近门店", number: 0, xianshi: true, };
  zhaopin = { id: "zhaopin", img: "assets/img/icon_zhaopinxinxi@2x.png", txt: "招聘信息" }
  wodemendian = { id: "mendian", img: "assets/img/icon_changqudianpu@2x.png", txt: "常去店铺", number: 0, mendianshow: true, };
  loadingShops = false;
  banners: any[] = ['assets/img/banner_sides2.png',];
  loading;

  constructor(public navCtrl: NavController, private app: App, public params: NavParams, public globalProvider: GlobalProvider, public navParams: NavParams,
    public modalCtrl: ModalController, private http: HttpGet, public cd: ChangeDetectorRef, private alertCtrl: AlertController, public _http: Http,
    private loadingCtrl: LoadingController, public platform: Platform, ) {
    this.userid = localStorage.getItem('custuserid');
    this.ads = [{ img: "assets/img/sy_imge2@2x.png" }, { img: "assets/img/sy_imge3@2x.png" },];
    this.ads2 = [{ img: "assets/img/sy_imge1@2x.png" }, { img: "assets/img/sy_imge2@2x.png" },];
    this.center_banner = "assets/img/bg_banner@2x.png";
    this.getBanners();
    if (this.platform.is('ios')) {
      this.slide_img = 'top-slide-img'
    }
    // this.banners = globalVar.home_banners;
  }



  refreshData() {
    console.log('refreshData()');
    
   
    if (globalVar.isDevice && globalVar.location.latitude == '') {
      console.log('开始定位');
      this.getLocation(this);
     
    } else {
      console.log('直接获取附近门店');
      this.setCity(globalVar.location.city);
      this.getGuessLikeShop(this.infiniteScroll);
    }
    // this.zhoubian();    
  }


  getBanners() {
    this._http.get(HttpUrl.getBanners).map(res => res.text()).subscribe(data => {
      let arr = data.replace('\n', '').split(';');
      // for (let item of arr) {
      //   this.banners.push(constVar.banner_url + item);
      // }
      for (let i = 0; i < arr.length; i++) {
        this.banners[i] = constVar.banner_url + arr[i];
      }
      console.log('getBanners res==' + this.banners);
 
    });

  }

  onBannerClick(url: string) {
    console.log('onBannerClick');
    if (!goLogin(this)) {
      return;
    }
    let name = url.substring(url.indexOf('banner/') + 7, url.length - 4);
    console.log('name=' + name);

    switch (name) {
     
      case 'zhangzhou723':
        this.app.getRootNav().push(xianShiYouHuiPage);
        break;
      case 'vivo':
        console.log('vivo');
        //25001167
        //evv0v
        this.http.httpMethodContext(HttpUrl.oneShopInfo + 'evv0v', {}, (res, context) => {
          res.followed = false;
          context.app.getRootNav().push(ShopDetailsPage, res);
        }, this);
        break;
      case 'haotaitai':
        console.log('haotaitai');
        //25001129
        //evuzt
        this.http.httpMethodContext(HttpUrl.oneShopInfo + 'evuzt', {}, (res, context) => {
          res.followed = false;
          context.app.getRootNav().push(ShopDetailsPage, res);
        }, this);
        break;
      default:
        console.log('other banner');
        break;
    }
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter()home');
    this.refreshData();
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
    }, 6000)

    // 
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


 
  getGuessLikeShop(infiniteScroll) {
    this.loadingShops = true;
  
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

  
  onSearchInput(event) {

    this.navCtrl.push(SearchShopPage, this.guessLikeShops)
    // let modal = this.modalCtrl.create(SearchShopPage);
    // modal.onDidDismiss(
    //   data => {
    //   }
    // );
    // modal.present();
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

      context.getGuessLikeShop();
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
        default:
          break;

      }
      this.app.getRootNav().push(nextPage, youhui);
    }
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
    this.getGuessLikeShop(this.infiniteScroll);
  }
  

  getShopDetails(item) {
    console.log(JSON.stringify(item))
    item.followed = false;
    this.app.getRootNav().push(ShopDetailsPage, item);
  }


  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.flipper_page + this.limit < this.total && !this.loadingShops) {
      console.log('加载更多...');
      this.flipper_page += this.limit;
      console.log('flipper_page==' + this.flipper_page);
      this.getGuessLikeShop(infiniteScroll);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
      console.log(this.total)
    }

  }

}
