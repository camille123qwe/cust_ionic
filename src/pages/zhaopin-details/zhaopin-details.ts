import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';


@Component({
  selector: 'page-zhaopin-details',
  templateUrl: 'zhaopin-details.html',
})
export class ZhaopinDetailsPage {
  goodsList = { sellprice: '', goodsface: '' };
  Priv;
  ShopInfo;
  StoreId;
  GoodsId;
  GoodsName
  aloneDetail;
  shangpingImg = [];
  jieshao = true;
  hPriv = false;
  pric = false;
  tedian = false;
  FxIMg = 'assets/img/icon_fenxiang@2x.png';
  goodsface_900 = constVar.goodsfaceurl_900;
  Taskid;
  zengsong = true;
  fenxiangzengnsong = {};
  fenxiang1 = false;
  fenxiang2 = false;
  fenxiang3 = false;
  zengsongmoshi = true;
  Privlist = [];
  cang = true;
  danwei = true;


  zhaopinInfo;
  StoreImg = [];
  title_banner = "";
  storefaceurl_300 = constVar.storefaceurl_300;
  storefaceurl_900 = constVar.storefaceurl_900;
  storeimgsurl_720 = constVar.storeimgsurl_720;
  tel_str = '';
  call_mendian = true;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initData();
  }
  initData() {
    this.zhaopinInfo = this.navParams.data;
    // this.zhaopinInfo = { "count": 0, "createtime": 1500618417411, "endtime": 0, "isdeduct": 0, "jobid": 10000001, "jobname": "12", "merchInfo": { "busman": "向军昆", "categoryid": "c.109", "city": "西城", "createtime": 1492054658931, "facetime": 0, "goodsradio": 53, "linktel": "18745647123", "locaddress": "测试地址", "merch36id": "hv05z", "merchid": 30000023, "merchname": "向军昆的测试", "province": "北京", "seen": 2, "status": 10, "type": 2, "updatetime": 0 }, "merchid": 30000023, "salery": 0, "starttime": 1500618417411, "status": 10, "storeInfo": { "buycount": 0, "city": "香港特别行政区", "closetime": "10:00", "costcashvalues": 5003, "costfluxkbs": 583680, "costmoney": 10088, "costvoicetimes": 99671, "createtime": 1492054710412, "custusercount": 6, "distance": 0, "goodscount": 15, "goodsradio": 53, "isfollowed": "false", "latitude": 22.53336, "longitude": 114.110884, "merchid": 30000023, "msmscount": 0, "opentime": "9:00", "province": "香港特别行政区", "quancount": 3, "seen": 2, "status": 10, "store36id": "evu4v", "storeaddr": "我是门店值", "storeface": "51ip0cvs7vskqm4topcalt5ts3.jpg", "storeid": 25000015, "storeimgs": "2o5tmvsu8g3vp8uf4hq8d3feg9.jpg", "storeman": "向军昆", "storename": "向军昆的门店" }, "storeid": 25000015, "telno": 0, "validday": 0 };

    this.title_banner = this.storefaceurl_900 + this.zhaopinInfo.storeInfo.storeface;
    if (this.zhaopinInfo.storeInfo.storeimgs == undefined) {
      this.StoreImg.push(this.title_banner);
    } else {
      this.StoreImg = this.zhaopinInfo.storeInfo.storeimgs.split(";");
      for (let i = 0; i < this.StoreImg.length; i++) {
        this.StoreImg[i] = this.storeimgsurl_720 + this.StoreImg[i];
      }

    }

    //工作年限
    if (!this.zhaopinInfo.workyear) {
      this.zhaopinInfo.workyear = '不限';
    }
    if (!this.zhaopinInfo.recordschool) {
      this.zhaopinInfo.recordschool = '不限';
    }
    if (typeof this.zhaopinInfo.telno == 'undefined' || this.zhaopinInfo.telno == 'null') {
      
      this.call_mendian = false;
      // this.telno = '暂无';
    } else {
      this.tel_str = 'tel:' + this.zhaopinInfo.telno;
    }
    if (this.zhaopinInfo.salery) {
      this.zhaopinInfo.saleryshow = this.zhaopinInfo.salery / 100;
    } else {
      this.zhaopinInfo.saleryshow = '面议';
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ZhaopinDetailsPage');
    

  }
  fenxiang() {
    let title = this.zhaopinInfo.jobname + this.zhaopinInfo.saleryshow;
    if (this.zhaopinInfo.isdeduct == 1) {
      title = title + "+提成";
    }
    let text = this.zhaopinInfo.storeInfo.storename + "发布了一个招聘信息，快来看看！";
    let img = this.title_banner;

    (<any>window).Cordova.exec((res) => {

    }, (err) => { showToast('分享失败'); },
      "RyzShare", "share",
      [{
        "shareButtonLabe": "分享",
        "cancelButtonLabel": "取消",
        "shareTitle": "分享内容",
        "title": title,
        "text": text,
        "url": "http://merch.diancall.com/modules/share/recruit/recruit.html" + "?jobid=" + this.zhaopinInfo.jobid,
        "imagePath": img
      }]);
  }
}
