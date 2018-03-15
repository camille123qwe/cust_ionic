import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar, globalVar, isLogin, goLogin, } from '../../common/global';
import { provisionAlertPage } from '../provision-alert/provision-alert';
import { HttpGet } from '../../providers/http-get';

@Component({
  selector: 'page-xianshishop',
  templateUrl: 'xianshishop.html'
})
export class xianShiShopPage {
  // 剩余抢券时间{{surplusTime}}天
  more = false;
  FxIMg = 'assets/img/icon_fenxiang@2x.png';
  goodsName = ''; sellprice = ''; marketprice = ''; baifenbi = ''; distance; storeName = ''; storeaddr = '';
  openTime = ''; closeTime = ''; start_stop = ''; surplusTime; goodsdesc = ''; goodsface; phonenum; unit = '';
  limttime;
  activeStore = [];
  storeId;
  rushId;
  jindu;
  rushshow;
  tel_str;
  goodsface_900 = constVar.goodsfaceurl_900;
  qiangTxt = '抢券';
  qiangClass = 'qiang';
  rushStoreid;
  rushid;
  StoreImg;
  maxDistance;
  overdue: boolean;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, private http: HttpGet, public navParams: NavParams, ) {
    this.rushshow = globalVar.rushShow;
    if (!!this.navParams.get('isOpenInstall')) {
      console.log('isOpenInstall');
      this.rushStoreid = this.navParams.data.storeid;
      this.rushid = this.navParams.data.rushId;

    } else {
      this.rushStoreid = this.navParams.data.storeid;
      this.rushid = this.navParams.data.rushid;
    }
    console.log('this.rushStoreid==' + this.rushStoreid);
    console.log('rushid==' + this.rushid);

  }

  genduo() {
    this.more = true;
  }
  ionViewDidLoad() {
    this.findSrush();
    if (this.more == true) {
      let tel = document.getElementById('xs_tel');
      tel.ontouchstart = function () {
        tel.style.backgroundColor = "#efeff4";
      };
      tel.ontouchend = function () {
        // 还原白色
        tel.style.backgroundColor = "transparent";
      };
    }

  }
  fnAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: ['确定']
    })
    alert.present();
  }
  provision() {
    console.log('0000' + JSON.stringify(this.activeStore));
    let myModal = this.modalCtrl.create(provisionAlertPage, this.activeStore);
    myModal.onDidDismiss((data) => {
      // console.log(JSON.stringify(data))
      if (data) {
        this.rushStoreid = data.storeid;
        this.storeId = data.storeid;
        this.maxDistance = data.distance;
        this.distance = data.distance;
        if (this.distance == 0) {
          this.distance = '';
        } else if (this.distance <= 1000) {
          this.distance = "<" + 10 + "m";
        } else if (this.distance >= 100000) {
          this.distance = Math.floor(this.distance / 1000) / 100 + "km"
        } else {
          this.distance = Math.floor(this.distance / 100) + "m";
        }
        this.storeName = data.storename;
        this.storeaddr = data.storeaddr;
        this.tel_str = 'tel:' + data.storetel;
        this.phonenum = data.storetel;
        let o = '09:00';
        let c = '18:00';
        data.opentime == undefined ? this.openTime = o : this.openTime = data.opentime;
        data.closetime == undefined ? this.closeTime = c : this.closeTime = data.closetime;
        showToast('已选择' + this.storeName)
      }

    })
    myModal.present();
  }
  // 

  retAlert(text) {
    if (typeof (text) == 'undefined' || text.length == 0) {
      return false;
    } else {
      return true;
    }
  }


  findSrush() {
    let data = {
      bean: {
        rushid: this.navParams.data.rushid,
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city,
      }
    }

    this.http.httpMethodContext(HttpUrl.findgoodsrush, data, (res, context) => {



      console.log('7788996status===' + JSON.stringify(res.status));
      if (res.status == 30 ) {
        context.overdue = false
      } else {
        context.overdue = true

        // res={"checkcount":0,"createtime":1499395554607,"goodsface":"3ol94nfrn3hferh9qcspbcdcrb.jpg","goodsimgs":"3ol94nfrn3hferh9qcspbcdcrb.jpg;","goodsname":"测试键盘","isRushed":"true","marketprice":888800,"releasequality":200,"retquality":198,"rushendtime":1500048000000,"rushid":1499395554607,"rushstarttime":1499270400000,"sellprice":666600,"status":20,"storeInfos":[{"buycount":0,"city":"深圳市","costcashvalues":0,"costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1499154164050,"custusercount":0,"distance":12345005,"goodscount":1,"goodsradio":53,"isfollowed":"false","latitude":0,"longitude":0,"merchid":30000131,"msmscount":0,"province":"广东省","quancount":0,"seen":2,"status":20,"store36id":"evuh6","storeaddr":"南海大道","storeface":"3nmnnjqdjgsb1b7lemr7prsgei.jpg","storeid":25000458,"storeman":"的家居设计","storename":"黑社会","storetel":"13425113656"},{"buycount":0,"city":"深圳市","costcashvalues":0,"costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1499140002814,"custusercount":0,"distance":5212300,"goodscount":0,"goodsradio":53,"isfollowed":"false","latitude":0,"longitude":0,"merchid":30000126,"msmscount":0,"province":"广东省","quancount":0,"seen":2,"status":80,"store36id":"evuh1","storeaddr":"铜鼓路10号","storeface":"1ppg6ttptfimcmjc7ciefsmpa9.jpg","storeid":25000453,"storeman":"ertet","storename":"花朵","storetel":"13510451648"},{"buycount":0,"city":"深圳市","costcashvalues":0,"costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1499133759539,"custusercount":0,"distance":45725124,"goodscount":0,"goodsradio":53,"isfollowed":"false","latitude":0,"longitude":0,"merchid":30000122,"msmscount":0,"province":"广东省","quancount":0,"seen":2,"status":80,"store36id":"evugw","storeaddr":"沙河街1-7","storeface":"04j82m3vd5rrtoj6fn6p8rabvd.jpg","storeid":25000448,"storeman":"ert","storename":"交易城市","storetel":"13425113656"}],"storeids":"25000458;25000453;25000448","storenames":"黑社会;花朵;交易城市","unit":"个","validendtime":1500652800000,"validstarttime":1499306400000}
        context.storeId = res.storeInfos[0].storeid;
        context.rushId = res.rushid;
        context.activeStore = res.storeInfos;
        context.goodsName = res.goodsname;
        context.sellprice = res.sellprice / 100;
        context.marketprice = res.marketprice / 100;
        context.baifenbi = "已抢" + Math.floor((res.releasequality - res.retquality) / res.releasequality * 100) + '%';
        context.surplusTime = Math.ceil((res.rushendtime - (new Date().getTime())) / 86400000);
        context.limttime = '剩余抢券时间' + context.surplusTime + '天';
        context.storeName = res.storeInfos[0].storename;
        context.storeaddr = res.storeInfos[0].storeaddr;
        context.goodsdesc = res.goodsdesc;
        context.phonenum = res.storeInfos[0].storetel;
        context.tel_str = 'tel:' + res.storeInfos[0].storetel;
        context.goodsface = res.goodsface;
        let imgs = [];
        imgs = res.goodsimgs.split(";");
        if (imgs.length > 5) {
          for (let i = 0; i < imgs.length; i++) {
            context.StoreImg.push(imgs[i])
            if (i >= 4) {
              break;
            }
          }
          console.log('img===' + context.StoreImg.length)
        } else {
          context.StoreImg = imgs;
        }
        context.unit = res.unit;
        if (res.isRushed == 'true') {
          console.log(666)
          context.qiangTxt = '已抢';
          context.qiangClass = 'yiqiang';
        } else {
          context.qiangTxt = '抢券';
          context.qiangClass = 'qiang';
          if (res.retquality == 0) {
            context.qiangTxt = '已抢完';
            context.qiangClass = 'yiqiang';
          }
        };

        context.maxDistance = res.storeInfos[0].distance;
        context.distance = res.storeInfos[0].distance;
        if (context.distance == 0) {
          context.distance = '';
        } else if (context.distance <= 1000) {
          context.distance = "<" + 10 + "m";
        } else if (context.distance >= 100000) {
          context.distance = Math.floor(context.distance / 1000) / 100 + "km";
        } else {
          context.distance = Math.floor(context.distance / 100) + "m";
        }


        let o = '09:00';
        let c = '18:00 ';
        if (globalVar.rushShow == true) {
          context.jindu = {
            'width': Math.floor((res.releasequality - res.retquality) / res.releasequality * 100) + '%',
          };
        } else {
          context.limttime = '抢购即将开始';
          context.jindu = {
            'width': 0 + 'px',
          };
          context.baifenbi = '抢购即将开始';

        }

        res.storeInfos[0].opentime == undefined ? context.openTime = o : context.openTime = res.storeInfos[0].opentime;
        res.storeInfos[0].closetime == undefined ? context.closeTime = c : context.closeTime = res.storeInfos[0].closetime;
        console.log('关门时间' + context.closeTime)

        let newDate1: any = new Date();
        newDate1.setTime(res.validstarttime);
        let start = newDate1.format('MM-dd');

        let newDate2: any = new Date();
        newDate2.setTime(res.validendtime);
        let end = newDate2.format('MM-dd');
        context.start_stop = start + '—' + end;
      }
    }, this);
  }

  // {"checkcount":0,"createtime":1499136461573,"goodsname":"aaa","marketprice":1,"releasequality":10,"retquality":8,"rushendtime":1514563200000,"rushid":1499136461573,
  // "rushstarttime":1499235336000,"sellprice":0,"status":10,"
  // storeInfos":[{"buycount":0,"city":"香港特别行政区","closetime":"10:00","costcashvalues":5003,
  // "costfluxkbs":583680,"costmoney":10088,"costvoicetimes":99671,"createtime":1492054710412,"custusercount":6,"distance":0,"goodscount":15,"goodsradio":53,
  // "isfollowed":"false","latitude":22.53336,"longitude":114.110884,"merchid":30000023,"msmscount":0,"opentime":"9:00","province":"香港特别行政区","quancount":3,
  // "seen":2,"status":10,"store36id":"evu4v","storeaddr":"我是门店值","storeface":"5lf4d8v1gck5p0fbnjm7nb2015.jpg","storeid":25000015,
  // "storeimgs":"2o5tmvsu8g3vp8uf4hq8d3feg9.jpg","storeman":"向军昆","storename":"向军昆的门店"},
  // ],

  ngshow(txt) {
    if (typeof (txt) == 'undefined' || txt.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  maxdistance() {
    console.log('距离大于100km')
    if (this.qiangTxt == '已抢' || this.qiangTxt == '已抢完') {
      this.rushGoods();
    } else {
      if (this.maxDistance >= 10000000) {
        console.log('最大距离为' + this.maxDistance)
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
                this.rushGoods();
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
        this.rushGoods();
      }
    }
  }

  rushGoods() {
    event.stopPropagation();

    let data = {
      bean: {
        rushid: this.rushid,
        storeid: this.storeId,
        custuserid: localStorage.getItem('custuserid'),
      },

    }
    this.http.httpMethodContext(HttpUrl.rushgoods, data, (res, context) => {
      if (res.retcode == 0) {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '成功抢得一张优惠券',
          message: '请在“我的优惠”中查看',
          buttons: ['我知道了']
        })
        alert.present();
        this.qiangTxt = '已抢';
        this.qiangClass = 'yiqiang';
      } else {
        this.fnAlert(res.retinfo)
      }
      console.log('抢购列表==' + JSON.stringify(res));
    }, this)
  }


  fenxiang() {
    console.log(this.rushId + '+++++' + this.goodsName);
    if (this.rushId == 1503043315445) {
      console.log('这是洗衣片')
      console.log(this.goodsface_900 + this.goodsface);
      (<any>window).Cordova.exec((res) => {
      }, (err) => { showToast('分享失败'); },
        "RyzShare", "share",
        [{
          "shareButtonLabe": "分享",
          "cancelButtonLabel": "取消",
          "shareTitle": "分享内容",
          "title": '【0元购】泡泡仔进口原料环保洗衣片0元出售!' + this.goodsName,
          "text": '泡泡仔进口原料环保洗衣片0元限量出售，环保不残留，省力好帮手，抢购成功即可到店领取！',
          "url": 'http://merch.diancall.com/modules/share/limitedGoods/limitedGoods.html' + "?StoreId=" + this.storeId + "?RushId=" + this.rushId,
          // "url": 'http://192.168.1.128:6001/modules/share/limitedGoods/limitedGoods.html' + "?StoreId=" + this.storeId + "?RushId=" + this.rushId,
          "imagePath": this.goodsface_900 + this.goodsface,
        }]);
    } else {
      console.log(this.goodsface_900 + this.goodsface);
      (<any>window).Cordova.exec((res) => {
      }, (err) => { showToast('分享失败'); },
        "RyzShare", "share",
        [{
          "shareButtonLabe": "分享",
          "cancelButtonLabel": "取消",
          "shareTitle": "分享内容",
          "title": '【限时底价抢购】' + this.goodsName,
          "text": '只卖7天数量有限，快来看看！',
          "url": 'http://merch.diancall.com/modules/share/limitedGoods/limitedGoods.html' + "?StoreId=" + this.storeId + "?RushId=" + this.rushId,
          // "url": 'http://192.168.1.128:6001/modules/share/limitedGoods/limitedGoods.html' + "?StoreId=" + this.storeId + "?RushId=" + this.rushId,
          "imagePath": this.goodsface_900 + this.goodsface,
        }]);
    }
  }
}
