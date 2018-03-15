import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ModalController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, saveLoginInfo, constVar } from '../../common/global';
import { ShopParticularsPage } from '../../pages/shop-particulars/shop-particulars';

@Component({
  selector: 'page-goods-manage',
  templateUrl: 'goods-manage.html'
})
export class GoodsManagePage {
  @ViewChild(Content) content: Content;

  types = [];
  all_group_type = { groupid: '', groupname: '全部', tab_class: "span-actived" };
  goods_list = [];
  last_select;
  offset = 0;  //加載更多的時間戳
  limit = 20;
  total = 0;
  infiniteScroll;
  current_type = '';  //全部
  goodsface_300 = constVar.goodsfaceurl_300;
  img_class: string = 'middle_img';
  storeid = 25000034;
  yhPrivilege = [];
  shopInfo;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, public modalCtrl: ModalController) {
    this.shopInfo = { storename: '' };
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad GoodsManagePage=='+JSON.stringify( this.navParams.data) );

    this.yhPrivilege = this.navParams.get('yhPrivilege');
    this.shopInfo = this.navParams.get('shopInfo');
    this.getGoodsTypes();
  }
  getGoodsTypes() {
    // [{"createtime":1487669671306,"display":1000,"groupid":"evu4n.101","groupname":"物联卡","merchid":30000001,"storeid":0}]
    console.log('this.shopInfo==' + JSON.stringify(this.shopInfo.store36id))
    let url = HttpUrl['shopGoodsGroup'] + this.shopInfo.store36id;

    this.http.httpMethodContext(url, {}, (res, context) => {
      console.log('types===' + JSON.stringify(res))
      for (let item of res) {
        item.tab_class = "span-off";
      }
      res.unshift(context.all_group_type);
      context.types = res;
      context.last_select = res[0];
      context.getGoods('');

      // console.log('context.types=='+JSON.stringify(context.types));
    }, this);
  }

  selectNews(item) {
    console.log('item==' + JSON.stringify(item));
    this.last_select.tab_class = 'span-off';
    item.tab_class = "span-actived";

    this.offset = 0;
    this.current_type = item.groupid;

    this.getGoods(item.groupid);
    this.last_select = item;
    this.content.scrollTo(0, 0, 200);

  }
  getGoods(id) {
    let dataParams = {
      "bean": {
        groupid: id,
        status: [10],
        storeid: this.shopInfo.storeid,
        // createtime: this.offset
      },
      flipper: {
        limit: this.limit,
        offset: this.offset,
        sort: 'createtime DESC'
      }
    }

    this.http.httpMethodContext(HttpUrl['shopGoods'], dataParams, (res, context) => {
      if (this.infiniteScroll != null) {
        console.log('this.infiniteScroll != null');
        this.scrollComplete();
      }

      context.total = res.total;
      for (let i = 0; i < res.rows.length; i++) {
        res.rows[i].sellprice = res.rows[i].sellprice / 100;
        res.rows[i].marketprice = res.rows[i].marketprice / 100;
        let xianjia = res.rows[i].sellprice;
        let yuanjia = res.rows[i].marketprice;
        if (yuanjia == 0) {
          res.rows[i].oldPriceShow = false;
        } else {
          res.rows[i].oldPriceShow = true;
        }

        if (xianjia == 0) {
          res.rows[i].sellprice = '待定';
        }
      }
      if (context.offset === 0) {
        context.goods_list = res.rows;
        // console.log('hhhh==' + JSON.stringify(context.usable_discounts.rows))
      } else {
        for (let item of res.rows) {
          context.goods_list.push(item);
        }
      }

    }, this);
  }

  getGoodsDetails(goodsid) {
    // let url = HttpUrl['goodsDetails']+goodsid;
    // this.http.httpMethodContext(url, {}, (res, context) => {

    // }, this);
  }
  doInfinite(infiniteScroll) {
    console.log('加载更多');
    this.infiniteScroll = infiniteScroll;
    if (this.offset < this.total) {
      this.offset += this.limit;
      this.getGoods(this.current_type);

    } else {
      // showToast('没有更多了...');
      infiniteScroll.complete();
      console.log('没有更多了...');
    }
  }
  scrollComplete() {
    this.infiniteScroll.complete();
  }

  // 商品详情
  detail(item, yhPrivilege, shopInfo) {
    console.log(JSON.stringify(item));
    console.log(JSON.stringify(shopInfo))
    let modalDet = this.modalCtrl.create(ShopParticularsPage, { key1: item, key2: yhPrivilege, key3: shopInfo });
    modalDet.present();
  }
}
