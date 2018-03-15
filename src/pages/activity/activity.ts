import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { ShopParticularsPage } from '../../pages/shop-particulars/shop-particulars';
import { ShopDetailsPage } from '../shop-details/shop-details';
/**
 * Generated class for the ActivityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  activeImg1 = 'assets/img/pinpai_imge_huaxun@2x.png';
  activeImg2 = 'assets/img/active@x2.jpg';
  activeImg3 = 'assets/img/active@x3.jpg';

  //  jiazhuang@1
  jiazhuang = [];
  jinping=[];
  yhPrivilege = [];
  footerShow = true;
  giftName = []; 
  pinpaiarr=[];
  xunwei='assets/img/pinpai_imge_huaxun@2x.png';
  // {'goodsid': '', 'storeid': '25001767','storeimgs':'assets/img/pinpai_imge_huaxun@2x.png','goodsname': '店呼包年卡',};
  huanan='assets/img/pinpai_imge_nanguo@2x.png';
  // {'goodsid': '', 'storeid': '25001767','storeimgs':'assets/img/pinpai_imge_nanguo@2x.png','goodsname': '店呼包年卡',};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
    this.jiazhuang = [
      [
        { 'goodsid': '100007916', 'storeid': '25000791', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/6kvgrf2vh5ugl75spikidt3lt2.jpg', 'goodsname': '诺贝尔瓷砖-全抛釉地砖  金谷雪灰', 'marketprice': '428', 'sellprice': '128' },
        { 'goodsid': '100007915', 'storeid': '25001838', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/5s65g0if46gh48f25htb38hr85.jpg', 'goodsname': '首秀经典欧式窗帘', 'marketprice': '499', 'sellprice': '99' }
      ],
      [
        { 'goodsid': '100007922', 'storeid': '25001813', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/7fio4dmpjk59qhub3onnk2qn9k.jpg', 'goodsname': '万家灯饰-客厅10头', 'marketprice': '1670', 'sellprice': '868' },
        { 'goodsid': '100007921', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_300/09etcec661fshm204pmmrvsj25.jpg', 'goodsname': '3M净水器-DWS1893', 'marketprice': '4699', 'sellprice': '2899' },
      ],
      [
        { 'goodsid': '100007937', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/4q29cmjqjif6dlmdrr7fkq4srt.jpg', 'goodsname': '北极绒纯棉家访四件套', 'marketprice': '198', 'sellprice': '99.9' },
        { 'goodsid': '100007859', 'storeid': '25001815', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/68nva3k04uo38hae04q64gid8a.jpg', 'goodsname': '欧美瓷砖卢娜灰  EDKMA88484', 'marketprice': '195', 'sellprice': '99' }
      ],
     
    ];
    this.jinping=[
      [
        { 'goodsid': '100007925', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_300/2c8787v32901p925h2lstju1vd.jpg', 'goodsname': '云南普洱-古树茶', 'marketprice': '268', 'sellprice': '59.9' },
        { 'goodsid': '100007944', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_300/0prs7aka40n5q5on53k3vjv5gq.jpg', 'goodsname': '红富士苹果', 'marketprice': '65', 'sellprice': '49.9' }
      ],
      [
        { 'goodsid': '100007945', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_300/0igjcv431hn12v73selc78e1qv.jpg', 'goodsname': '店呼包年卡', 'marketprice': '', 'sellprice': '398' },
        { 'goodsid': '100007926', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/72jhqaqinams08ucua4him315o.jpg', 'goodsname': '家庭套餐', 'marketprice': '168', 'sellprice': '39' }
      ],
      [
        { 'goodsid': '100007951', 'storeid': '25001761', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/7t7mb7vd8id44rgn39qpcp1650.jpg', 'goodsname': '叶苑黑珍珠生态养生茶    两盒', 'marketprice': '690', 'sellprice': '168' },
        // { 'goodsid': '100007926', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/72jhqaqinams08ucua4him315o.jpg', 'goodsname': '家庭套餐', 'marketprice': '168', 'sellprice': '39' }
      ],
    ];
    this.pinpaiarr=[
      [
        {'goodsid': '', 'storeid': '25001834','storeimgs':'assets/img/pinpai_imge_baoshilong@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001825','storeimgs':'assets/img/pinpai_imge_dajinni@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001813','storeimgs':'assets/img/pinpai_imge_furen@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001837','storeimgs':'assets/img/pinpai_imge_3m@2x.png','goodsname': '店呼包年卡',},
      ],
      [
        {'goodsid': '', 'storeid': '25001835','storeimgs':'assets/img/pinpai_imge_wanjia@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001838','storeimgs':'assets/img/pinpai_imge_shouxiu@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25000834','storeimgs':'assets/img/pinpai_imge_shenlu@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001828','storeimgs':'assets/img/pinpai_imge_jiaodian@2x.png','goodsname': '店呼包年卡',}
      ],
      [
        {'goodsid': '', 'storeid': '25001826','storeimgs':'assets/img/pinpai_imge_jianan@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001815','storeimgs':'assets/img/pinpai_imge_oumei@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25000791','storeimgs':'assets/img/pinpai_imge_nuobeier@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001827','storeimgs':'assets/img/pinpai_imge_meida@2x.png','goodsname': '店呼包年卡',}
      ],
      [
        
        // {'goodsid': '', 'storeid': '25001767','storeimgs':'pinpai_imge_3m@2x','goodsname': '店呼包年卡',},
        // {'goodsid': '', 'storeid': '25001767','storeimgs':'pinpai_imge_baoshilong@2x','goodsname': '店呼包年卡',}
      ],

    ];

    this.cdaward();
  }

  dataShowFn(data){
    if(typeof(data)=='undefined' || data==''){
      return false;
    }else{
      return true;
    }
  }
  goGoods(item) {
    let type = 'alonegoods'
    this.oneShop(item, type)
  }

  gostores(items){
    console.log(JSON.stringify(parseInt(items).toString(36)))
    let url = HttpUrl.oneShopInfo + parseInt(items).toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res) !== 'undefined' || res !== '') {
        let storeInfo = res
        // items.followed = false;
        context.navCtrl.push(ShopDetailsPage, storeInfo);
      }
    }, this)
  }


  //查询门店
  oneShop(item, type) {
    let url = HttpUrl.oneShopInfo + parseInt(item.storeid).toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res) !== 'undefined' || res !== '') {
        let storeInfo = res
        context.goodsDetail(item, storeInfo, type)
      }
    }, this)
  }

  // 查询商品详情
  goodsDetail(item, storeInfo, type) {
    let url = HttpUrl.aloneGoods + parseInt(item.goodsid).toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res) !== 'undefined' || res !== '') {
        let goodsInfo = res;
        let navParams = { goodsInfo, storeInfo, type }
        if (type == 'alonegoods') {
          this.navCtrl.push('GoodsxiangqingPage', navParams);
        } else {
          this.navCtrl.push('GoodsxiangqingPage', navParams);
        }

      }
    }, this)
  }

  goDiancall(data) {
    let type = 'groupgoods';
    let item;
    console.log(data)
    if (data == 'group1') {
      item = { 'goodsid': '100007919', 'storeid': '25001767', }
      this.priviLege(item)
      this.oneShop(item, type);
    } else if (data == 'group2') {
      item = { 'goodsid': '100007920', 'storeid': '25001767', }
      this.priviLege(item)
      this.oneShop(item, type);
    } else {
      item = { 'goodsid': '100007923', 'storeid': '25001767', }
      this.priviLege(item)
      this.oneShop(item, type);
    }
    // 
  }

  priviLege(item) {

    let url = HttpUrl.privilege + parseInt(item.storeid).toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {

      context.yhPrivilege = res;
    }, this)
  }

  goturn(){
    
      // let giftNames = ["全国流量500M", "0分钟通话", "全国流量30", "猪肉丝"]
      // let gif=["10000001", "10000002", "10000003", "10000004", "10000005", "10000006",]
     
        this.navCtrl.push('TurntablePage', { 'gift': this.giftName, 'restcdrcount': '' })
      
  }
  cdaward() {
    console.log(666)
    let data = {
      'bean': {
        status: [10]
      }
    }
  
    this.http.httpMethodContext(HttpUrl.cdaward, data, (res, context) => {
      context.giftName=[];
      console.log('奖品' + JSON.stringify(res));
      for (let item of res.rows) {

        context.giftName.push({'awardtitle':item.awardtitle,'awarddetail':item.awarddetail,'cdrawardid':item.cdrawardid});

      }
      console.log('xxx==' + JSON.stringify(context.giftName));
    }, this)
  }

  fenxiang() {
    // console.log(JSON.stringify(this.shopInfo.storename));
    // console.log(JSON.stringify(this.StoreID));
    // console.log(JSON.stringify(this.title_banner));

    (<any>window).Cordova.exec((res) => {
    }, (err) => { showToast('分享失败'); },
      "RyzShare", "share",
      [{
        "shareButtonLabe": "分享",
        "cancelButtonLabel": "取消",
        "shareTitle": "分享内容",

        "title": '店呼1212金浦家装节',
        "text": '金浦家装联盟大特价，你敢来我就敢减，万元大礼包等着你',
        "url": "http://c.diancall.com/diancall_web/www/index.html?path=activity9527#activity",
        "imagePath": 'http://c.diancall.com/diancall_web/www/assets/img/sy_banner_jingxuan@2x.png'
      }]);
  }
}
