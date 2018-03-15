import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar, globalVar, isLogin, goLogin } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { xianShiShopPage } from '../xianshishop/xianshishop';
@Component({
  selector: 'page-xianshiyouhui',
  templateUrl: 'xianshiyouhui.html'
})
export class xianShiYouHuiPage {
  tab1_class;
  tab2_class;
  type: string;
  FxIMg = 'assets/img/icon_fenxiang@2x.png';
  // rush_ist = [];
  // rush_right = [];
  goodsface_300 = constVar.goodsfaceurl_300;
  goodsface_900 = constVar.goodsfaceurl_900;
  storefaceurl_300 = constVar.storefaceurl_300;
  storefaceurl_900 = constVar.storefaceurl_900;
  storeimgsurl_720 = constVar.storeimgsurl_720;
  validday = '';
  shenyushijian = 0;
  status = 20;
  jindu;
  qidai = true;
  qiangTxt = '抢券';
  maxDistance;
  storeName;
  qiangText;
  loading;
  isLoading = false;
  infiniteScroll;
  rush_ist = { rows: [], offset: 0, total: 0, limit: 10, thisShow: true };  //抢购开始
  rush_right = { rows: [], offset: 0, total: 0, limit: 10, thisShow: true }; //抢购未开始
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: HttpGet, private loadingCtrl: LoadingController) {

    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.type = 'left';
  }
  selectedLeft(infiniteScroll) {
    this.rush_ist.rows = [];
    this.type = 'left';
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.rush_ist = { rows: [], offset: 0, total: 0, limit: 10, thisShow: true };  //
    this.status = 20;
    if (this.isLoading) {
      console.log('正在加载，请稍后...');
      showToast('正在加载，请稍后...');
      return;
    }
    this.rushList(infiniteScroll);

  }
  selectedRight(infiniteScroll) {
    this.rush_right.rows = [];
    console.log('selectedRight')
    this.type = 'right';
    this.tab1_class = "text-off";
    this.tab2_class = "text-actived";
    this.rush_right = { rows: [], offset: 0, total: 0, limit: 10, thisShow: true }; //
    this.status = 10;
    if (this.isLoading) {
      console.log('正在加载，请稍后...');
      showToast('正在加载，请稍后...');
      return;
    }
    this.rushList(infiniteScroll);

  }
  ionViewDidLoad() {
    this.rushList(this.infiniteScroll);
  }
  fnAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: ['确定']
    })
    alert.present();
  }



  xiangqing(item) {
    this.navCtrl.push(xianShiShopPage, item);
  }

  // querygoodsrush:urlHost+'/pipes/rush/querygoodsrush',//抢购信息列表

  //获取列表
  rushList(infiniteScroll) {
    this.isLoading = true;
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.isLoading = false;
      if (this.loading) {
        this.loading.dismiss();
      }
    }, 10000);

    // 区分抢购分页参数
    let offsetType;
    if (this.type == 'left') {
      offsetType = {
        offset: this.rush_ist.offset,
        limit: this.rush_ist.limit,
      }
    } else {
      offsetType = {
        offset: this.rush_right.offset,
        limit: this.rush_right.limit,
      }
    }
    let data = {
      'bean': {
        // goodsname:'',
        status: this.status,
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city,
      }, "flipper": offsetType,
    }
    this.http.httpMethodContext(HttpUrl.querygoodsrush, data, (res, context) => {
      if (typeof (infiniteScroll) == undefined) {
        infiniteScroll.complete();
      }
      context.rush_ist.total = res.total;
      context.rush_right.total = res.total;
      console.log('抢购列表==' + JSON.stringify(res));
      if (context.loading) {
        context.loading.dismiss();
      }
      context.isLoading = false;

      for (let item of res.rows) {
        context.maxDistance = item.storeInfos[0].distance;
        context.storeName = item.storeInfos[0].storename;
        if (item.storeInfos[0].distance == 0) {
          item.storeInfos[0].distance = '';
        } else if (item.storeInfos[0].distance <= 1000) {

          item.storeInfos[0].distance = "<" + 10 + "m";

        } else if (item.storeInfos[0].distance >= 100000) {

          item.storeInfos[0].distance = Math.floor(item.storeInfos[0].distance / 1000) / 100 + "km"

        } else {

          item.storeInfos[0].distance = Math.floor(item.storeInfos[0].distance / 100) + "m";

        }
        if (context.type == 'left') {
          item.progress = '已抢' + (Math.floor((item.releasequality - item.retquality) / item.releasequality * 100)) + '%';
          item.jindu = {
            'width': Math.floor((item.releasequality - item.retquality) / item.releasequality * 100) + '%'
          }
          if (item.isRushed == 'true') {
            item.qiangTxt = '已抢';
            item.qiangClass = 'yiqiang';
            context.qiangText = item.qiangTxt;

          } else {
            item.qiangTxt = '抢券';
            item.qiangClass = 'qiang';
            if (item.retquality == 0) {
              item.qiangTxt = '已抢完';
              item.qiangClass = 'yiqiang';
              context.qiangText = item.qiangTxt;
            }

          }

        }
      }
      if (res.rows.length > 0) {
        let newDate1: any = new Date();
        newDate1.setTime(res.rows[0].rushstarttime);
        let start = newDate1.format('MM月dd日');

        let newDate2: any = new Date();
        newDate2.setTime(res.rows[0].rushendtime);
        let end = newDate2.format('MM月dd日');
        context.validday = start + '—' + end;

        this.shenyushijian = Math.ceil((res.rows[0].rushendtime - (new Date().getTime())) / 86400000) + 1;
      }
      // 左右分页
      if (context.type == 'left') {
        globalVar.rushShow = true;
        if (context.rush_ist.offset === 0) {
          context.rush_ist.rows = res.rows;
        } else {
          for (let item of res.rows) {
            context.rush_ist.rows.push(item);
          }
        }
        if (context.rush_ist.rows.length == 0) {
          context.rush_ist.thisShow = false;
        }
      } else {
        globalVar.rushShow = false;
        if (context.rush_right.offset === 0) {
          context.rush_right.rows = res.rows;
        } else {
          for (let item of res.rows) {
            context.rush_right.rows.push(item);
          }
        }

        if (context.rush_right.rows.length == 0) {
          context.rush_right.thisShow = false;
        }
        if (context.rush_right.rows.length != 0) {
          context.qidai = false;
        }
      }


    }, this);
    console.log('获取完成')
  }

  //
  maxdistance(item, infiniteScroll) {
    event.stopPropagation();
    if (this.qiangText == '已抢' || this.qiangText == '已抢完') {
      this.rushGoods(item, infiniteScroll);
    } else {
      if (this.maxDistance >= 10000000) {
        let Distances = Math.floor(this.maxDistance / 100 / 1000) + 'km'
        let showMessage = '<p>' + this.storeName + '</p>' + '<p>相距' + Distances + '距离较远</p>' + '<p>是否确认继续抢购?</p>';
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '您与提货商铺',
          message: showMessage,
          buttons: [
            {
              text: '确定',
              role: 'cancel',
              handler: () => {
                this.rushGoods(item, infiniteScroll);
              }
            },
            {
              text: '取消',
              handler: () => {
                console.log('Buy clicked');
              }
            }
          ]
        })
        alert.present();
      } else {
        this.rushGoods(item, infiniteScroll);
      }
    }
  }

  //抢优惠商品
  rushGoods(item, infiniteScroll) {
    event.stopPropagation();

    let data = {
      bean: {
        rushid: item.rushid,
        storeid: item.storeInfos[0].storeid,
        custuserid: localStorage.getItem('custuserid'),
      },

    }
    this.http.httpMethodContext(HttpUrl.rushgoods, data, (res, context) => {
      if (res.retcode == 0) {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '成功抢得一张优惠券',
          message: '请在“我的优惠”中查看',
          buttons: ['我知道了'],
        })
        alert.present();
        item.qiangTxt = '已抢';
        item.qiangClass = 'yiqiang';
        this.rushList(infiniteScroll);
      } else {
        this.fnAlert(res.retinfo)
      }
      // console.log('抢购列表==' + JSON.stringify(res));
    }, this)
  }

  fenxiang() {

    (<any>window).Cordova.exec((res) => {

    }, (err) => { showToast('分享失败'); },
      "RyzShare", "share",
      [{
        "shareButtonLabe": "分享",
        "cancelButtonLabel": "取消",
        "shareTitle": "分享内容",

        "title": '全城底价限时秒杀开启',
        "text": '携手商户，礼遇全城，底价热浪来袭，一降到底，此时不抢何时抢',
        "url": 'http://merch.diancall.com/modules/share/limitedList/limitedList.html',
        "imagePath": '',
      }]);
  }
  doInfinite(infiniteScroll) {
    // setTimeout(() => {
    console.log('加载更多');
    switch (this.type) {
      case 'left':
        if (this.rush_ist.offset + this.rush_ist.limit < this.rush_ist.total && !this.isLoading) {
          this.rush_ist.offset += this.rush_ist.limit;
          this.rushList(infiniteScroll);
        }
        break;
      case 'right':
        if (this.rush_right.offset + this.rush_right.limit < this.rush_right.total && !this.isLoading) {
          this.rush_right.offset += this.rush_ist.limit;
          this.rushList(infiniteScroll);
        }
        break;
      default:
        // context.globalProvider.presentToast('没有更多了...');
        break;
    }
    infiniteScroll.complete();
    // }, 200);
  }

}



// {"checkcount":0,"createtime":1499242224928,"goodsimgs":"http://localhost:9101/dir/goods53_300/1dpj5ob6gq03songfc2g4un8uj.jpg;http://localhost:9101/dir/goods53_300/4uq6848hqqvvandh3r4nooqghl.jpg",
//  "goodsname":"测试抢购商品","marketprice":299,"releasequality":10,"retquality":10,"rushendtime":1500134400,"rushid":1499242224928,"rushstarttime":1499616000,"sellprice":199,"status":10,
//  "storeInfos":[
//                 {"buycount":0,"city":"深圳市","costcashvalues":0,"costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1494403732396,"custusercount":0,
//                 "distance":0,"goodscount":1,"goodsradio":53,"isfollowed":"false","latitude":22.539536,"longitude":114.090618,"merchid":30000024,"msmscount":0,
//                 "province":"广东省","quancount":1,"seen":2,"status":20,"store36id":"evu4y","storeaddr":"123123","storeface":"5kn0raccsh73pbs3ufcicidsvk.jpg","storeid":25000018,
//                 "storeimgs":"1d3om8rdbk5mtflbalmiuf3spa.jpg;5cedqc32u176qq27gn1in94vqn.jpg;28v096r7gpibovucv1s7qccccn.jpg;69j5jrldo1d4moqhijoov08787.jpg;0i5njb5gua0c53582jbbp5bgco.jpg",
//                 "storeman":"Terry","storename":"Terry专用测试","storetel":"123123"}
//               ],
// "storeids":"25000018","storenames":"Terry专用测试","unit":"个","validendtime":1500739200,"validstarttime":1500220800},
