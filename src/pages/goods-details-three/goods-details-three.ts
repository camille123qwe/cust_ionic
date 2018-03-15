import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';
import { ShopDetailsPage } from '../shop-details/shop-details';
/**
 * Generated class for the GoodsDetailsTwoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-details-three',
  templateUrl: 'goods-details-three.html',
})
export class GoodsDetailsThreePage {
  @ViewChild(Content) content: Content;
  goodsdata;
  goodImg = [];
  goodsface_900 = constVar.goodsfaceurl_900;
  storeface_900 = constVar.storefaceurl_900;
  callimg = 'assets/img/icon_shangpudianhua@2x.png';
  goodsName = ''; sellPrice = ''; marketprice = ''; goodsDesc = ''; goodsdetail = '';
  storeIMg = ''; storeName = ''; disTance = ''; storeAddr = '';
  hotGoodRows = [];
  props;
  Opacity;
  tel_str = '';
  divShow = false;
  heightNUm = 0;
  followed;
  shopcar = 'assets/img/icon_gouwuche@2x.png';
  goodcunt = 1;
  goodsInfo;
  Taskid;
  serveData = 0;
  servemoney;
  serviceDistance = '';
  thisStore;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, public modalCtrl: ModalController, public zone: NgZone, ) {
    this.goodsdata = this.navParams.data;
    this.detilsShow()
  }



  detilsShow() {
    let bannersHeight = $('#banner').height()
    console.log('===bannersHeight' + bannersHeight)
    if (bannersHeight > screen.height - 95) {
      let timepiece = setInterval(() => {
        clearInterval(timepiece)
        this.divShow = true
      }, 500)
    } else {
      this.divShow = false
    }
    console.log(bannersHeight > screen.height)
  }

  scrollHandler(event) {

    this.zone.run(() => {
      // let scrollHeight = this.content.getContentDimensions().scrollTop;
      // let bannersHeight = $('#goodbanners').height()
      // if (this.heightNUm < scrollHeight) {
      //   this.heightNUm = scrollHeight
      //   if (bannersHeight - screen.height - 95 - scrollHeight <= 0) {
      //     this.divShow = false
      //   } else {
      //     this.divShow = true
      //   }
      // } else {

      //   this.heightNUm = scrollHeight
      //   if (scrollHeight - bannersHeight -95+screen.height <= 0) {
      //     if (bannersHeight > screen.height - 95) {
      //       this.divShow = true
      //     } else {
      //       this.divShow = false
      //     }
      //   } else {
      //     this.divShow = false
      //   }
      // }
      let scrollHeight = this.content.getContentDimensions().scrollTop;
      let bannersHeight = $('#banner').height()
      let hasshow = screen.height - 100;
      if (this.content.getContentDimensions().scrollTop < bannersHeight - hasshow) {
        this.divShow = true;
      } else {
        this.divShow = false;
      }

    })
  }

  goShop() {
    this.navCtrl.push('ShopCarPage')
  }


  goodsDetail() {
    console.log('store36id===' + JSON.stringify(this.goodsdata.storeid.toString(36)));
    let url = HttpUrl.aloneGoods + this.goodsdata.goods36id
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res.goodsimgs) == 'undefined' || res.goodsimgs == '') {
        context.goodImg.push(context.goodsface_900 + res.goodsface)
      } else {
        for (let item of res.goodsimgs.split(';')) {
          context.goodImg.push(context.goodsface_900 + item)
        }

      }
      context.goodsName = res.goodsname;
      context.sellPrice = res.sellprice;
      context.marketprice = res.marketprice;
      context.goodsDesc = res.goodsdesc;
      context.goodsdetail = res.detail;
      context.props = res.propValues;
    }, this)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsxiangqingPage');
    this.goodsDetail();
    this.oneShop();
    this.hotGoods()
    this.detilsShow();
    this.chaxunrenwu();
  }
  ionViewWillEnter() {
    this.detilsShow();
    this.custmerchdelivery();
  }


  // html  *ngIf='responseData(item)'
  responseData(item) {
    if (typeof (item) == 'undefined' || item == '') {
      return false;
    } else {
      return true;
    }
  }

  // 判断是否有多规格
  isEmptyObject(obj) {
    for (var key in obj) {
      console.log(666)
      return false;
    }
    return true;
  }
  sha(item) {
    if (item.marketprice <= item.sellprice) {
      return false;
    } else {
      return true;
    }
  }

  // 结算 多规格选择   没有规格直接去购物车
  addgoods(item) {
    // let props = this.goodsdata.goodsInfo.propValues;
    console.log(JSON.stringify(this.goodsdata))
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      let goodsInfo = this.goodsdata
      let navParams = { goodsInfo }
      let modal = this.modalCtrl.create('DeliveryPopupPage', navParams);
      modal.onDidDismiss((data) => {
        if (!data || typeof (data) == 'undefined' || data == 0 || 　item == '无') {
          this.goodcunt = 1;
        } else {
          this.goodcunt = data.afterDelte
        }

        console.log('this.goodcunt==' + this.goodcunt)
        // console.log("onDidDismiss==" + JSON.stringify(data));

      });
      modal.present();
    }
  }
  custmerchdelivery() {
    this.http.httpMethodContext(HttpUrl.custmerchdelivery + this.goodsdata.merchid.toString(36), {}, (res, context) => {
      if (typeof (res.rows) == 'undefined' || res.rows == '' || res.rows.length == 0 || typeof (res.rows[0].serviceDistance) == 'undefined' || res.rows[0].serviceDistance == '') {
        context.serviceDistance = ''
      } else {
        context.serviceDistance = res.rows[0].serviceDistance;
        context.serveData = (res.rows[0].sendFreePrice / 100) - (context.sellPrice / 100) * context.goodcunt;
        if (context.serveData > 0) {
          context.servemoney = '还差' + context.serveData + '元免费送货'
        } else {
          context.servemoney = '免费送货';
        }
        if (context.serviceDistance == 0) {
          context.serviceDistance = '';
        } else if (context.serviceDistance <= 1000) {

          context.serviceDistance = 10 + "m送货上门";

        } else if (context.serviceDistance >= 100000) {

          context.serviceDistance = Math.floor(context.serviceDistance / 1000) / 100 + "Km送货上门"

        } else {

          context.serviceDistance = Math.floor(context.serviceDistance / 100) + "m送货上门";

        }
      }
    }, this)
  }
  // 结算 多规格选择   没有规格直接去购物车
  addToCart(item) {
    event.stopPropagation();
    console.log(JSON.stringify(item))
    let data = {
      'bean': {
        cartgoodsitemsid: '',
        custuserid: localStorage.getItem("custuserid"),
        goodsid: this.goodsdata.goodsid,
        count: 1,
        storeid: this.goodsdata.storeid,
        // status:'',//		short
        // props:''
      }, 'cols': '[""]'
      , 'props': [],
    }
    console.log(JSON.stringify(JSON.stringify(data)))
    this.http.httpMethodContext(HttpUrl.add2custcart, data, (res, context) => {
      if (res.retcode == 0) {
        context.navCtrl.push('ShopCarPage')
      }
    }, this)
  }

  //关注
  toFollow() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      let url = HttpUrl.followShop + this.goodsdata.goodsInfo.goods36id;  //#	int	门店36ID
      this.http.httpMethodContext(url, {}, (res, context) => {
        showToast('关注成功');
        context.followed = true;
        // context.navParams.data.isfollowed = 'true';
      }, this);
    }

  }
  //查询门店
  oneShop() {
    let url = HttpUrl.oneShopInfo + this.goodsdata.storeid.toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {
      context.thisStore = res;
      context.storeIMg = res.storeface;
      context.storeName = res.storename;
      context.disTance = res.distance;
      if (context.disTance == 0) {
        context.disTance = '';
      } else if (context.disTance <= 1000) {

        context.disTance = "<" + 10 + "m";

      } else if (context.disTance >= 100000) {

        context.disTance = Math.floor(context.disTance / 1000) / 100 + "km"

      } else {

        context.disTance = Math.floor(context.disTance / 100) + "m";

      }
      context.storeAddr = res.storeaddr;
      context.tel_str = 'tel:' + res.storetel;
      context.followed = res.isfollowed
      console.log(JSON.stringify(context.thisStore));
    }, this)
  }

  goStore() {
    let item = this.thisStore
    item.followed = false;
    this.navCtrl.push(ShopDetailsPage, item);
  }

  // 查询热门商品
  hotGoods() {
    // shopGoods
    console.log('store36id===' + JSON.stringify(this.goodsdata.storeid.toString(36)));
    let data = {
      'bean': {
        storeid: this.goodsdata.storeid,
        status: [10],
      }
    };
    // let url = HttpUrl.shopGoods + this.goodsdata.storeid.toString(36)
    this.http.httpMethodContext(HttpUrl.shopGoods, data, (res, context) => {
      if (res.rows.length <= 4) {
        let newarry = [];
        for (let i = 0; i < res.rows.length; i += 2) {
          newarry.push(res.rows.slice(i, i + 2));
        }
        this.hotGoodRows = newarry;
      } else {
        let goodsRows = res.rows
        let num = 4;
        context.getArrayItems(goodsRows, num)
      }


    }, this)

  }

  // 4个随机热门商品
  getArrayItems(arr, num) {
    var temp_array = new Array();
    for (let index in arr) {
      temp_array.push(arr[index]);
    }
    var return_array = new Array();
    for (let i = 0; i < num; i++) {
      if (temp_array.length > 0) {
        var arrIndex = Math.floor(Math.random() * temp_array.length);
        return_array[i] = temp_array[arrIndex];
        temp_array.splice(arrIndex, 1);
      } else {
        break;
      }
    }

    let newarry = [];
    for (let i = 0; i < return_array.length; i += 2) {
      newarry.push(return_array.slice(i, i + 2));
    }
    this.hotGoodRows = newarry;
    // for (let item of this.hotGoodRows) {
    //   console.log(JSON.stringify(item))
    // }
  }


  goNextPage(item) {
    console.log(JSON.stringify(item))
    this.navCtrl.push('GoodsDetailsTwoPage', item)
  }

  chaxunrenwu() {
    //查询分享任务
    // var ;
    let data = {
      bean: {
        type: 1,
        storeid: this.goodsdata.storeid,
      }
    }
    this.http.httpMethodContext(HttpUrl.fenxiangrenwu, data, (res, context) => {
      console.log('任务==IDIDID' + JSON.stringify(res.result));
      if (typeof (res.result) == 'undefined' || typeof (res.result.taskid) == 'undefined') {
        context.Taskid = '';
      } else {
        context.Taskid = res.result.taskid;
      }

      console.log('asdasasd' + context.Taskid)
    }, this);

  }

  share() {
    console.log(this.goodsdata.goodsname);
    console.log(this.goodsdata.storeid);
    console.log(this.goodsdata.goodsid)
    console.log(this.goodsdata.goodsface);
    console.log(this.Taskid);
    (<any>window).Cordova.exec((res) => {

    }, (err) => { showToast('分享失败'); },
      "RyzShare", "share",
      [{
        "shareButtonLabe": "分享",
        "cancelButtonLabel": "取消",
        "shareTitle": "分享内容",
        "title": this.goodsdata.goodsname,
        "text": "价格实惠，还获得了神秘礼品，赚到了，分享给你们",
        "url": "http://merch.diancall.com/modules/share/sharegoods/goods.html" + "?StoreId=" + this.goodsdata.storeid.toString(36) + "?GoodsId=" + this.goodsdata.goodsid.toString(36) + "?TaskId=" + this.Taskid,
        "imagePath": this.goodsface_900 + this.goodsdata.goodsface,
      }]);
  }
}
