import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, globalVar, constVar } from '../../common/global';
import { ShopDetailsPage } from '../shop-details/shop-details';
import { HomePage } from '../home/home'

@Component({
  selector: 'page-search-shop',
  templateUrl: 'search-shop.html'
})
export class SearchShopPage {
  myInput: string = '';
  historys = [];
  historyShow = false;
  shop_list = [];
  img_class: string = 'small_img_class';
  storefaceurl_300 = constVar.storefaceurl_300;
  Val_goodscount = false;
  Val_buycount = false;
  searchGoods = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private http: HttpGet) {

    // this.searchGoods = this.navParams.data;
    // console.log('searchGoods==============' + JSON.stringify(this.searchGoods));
    this.initHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchShopPage');
  }
  initHistory() {
    let local = localStorage.getItem('search_shop_history');
    if (local == null) {
      this.historyShow = false;
    } else {
      this.historyShow = true;
      this.historys = local.split(',');
      this.historys.reverse();
    }
  }



  onSearchInput(value) {
    
    console.log('myInput==' + value);

    this.search(value);
  }



 

  close() {

    this.navCtrl.pop();
  }

  clearHistory() {
    localStorage.removeItem('search_shop_history');
    this.historys = [];
    this.historyShow = false;
  }
  searchHistoryShop(shop_name) {

    console.log('searchHistoryShop==' + shop_name);
    this.myInput=shop_name;
    this.search(shop_name)
  }
  search(shop_name) {
    console.log('shop_name');
    if (shop_name == '') {
      return;
    }
    this.addToHistorys(shop_name);
    this.historyShow = false;
    localStorage.setItem('search_shop_history', this.historys.toString());

    let dataParams = {
      "bean": {
        longitude: '',
        latitude: '',
        city: '',
        storename: shop_name
      },
      // "flipper": {
      //   limit: 20,
      //   offset: 20,
      // }
    }
    // {"rows":[{"city":"深圳市","createtime":1486536440817,"custusercount":0,"distance":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storeman":"张生","storename":"尚美酒店大冲测试点"},{"city":"深圳市","createtime":1486540997349,"custusercount":0,"distance":0,"goodsradio":53,"latitude":22.539,"longitude":113.929469,"merchid":30000002,"status":10,"store36id":"evu4i","storeaddr":"南山桃园路1号","storeface":"0m2cn2bfu5044ogumj1nql0b68.jpg","storeid":25000002,"storeimgs":"65b4ee97t7o0knu3102dl6o032.jpg;54pkqdchls3mqmt8ctff0bufor.jpg","storeman":"张生","storename":"尚美酒店桃园测试点"}],"total":2}
    this.http.httpMethodContext(HttpUrl.searchShop, dataParams, (res, context) => {
      context.shop_list = res.rows;
      // console.log('+++++++++++++++++++++'+res.rows)



      for (let i = 0; i < context.shop_list.length; i++) {

        if (context.shop_list[i].goodscount == 0) {
          this.Val_goodscount = true;
        } else {
          this.Val_goodscount = false;
        }

        if (context.shop_list[i].buycount == 0) {
          this.Val_buycount = true;
        } else {
          this.Val_buycount = false;
        }


        if (context.shop_list[i].distance === 0) {

          context.shop_list[i].distance = "";

        } else if (context.shop_list[i].distance <= 1000) {

          context.shop_list[i].distance = "<" + 10 + "m";

        } else if (context.shop_list[i].distance >= 100000) {

          context.shop_list[i].distance = Math.floor(context.shop_list[i].distance / 1000) / 100 + "km"

        } else {

          context.shop_list[i].distance = Math.floor(context.shop_list[i].distance / 1000) + "m";

        }
      }
      // context.fistNews.title = res.title;
      // context.fistNews.url = res.newsurl;
    }, this);
  }
  addToHistorys(shop_name) {
    let included = false
    for (let item of this.historys) {
      if (item === shop_name) {
        included = true;
        break;
      }
    }
    if (!included) {
      this.historys.push(shop_name);
    }

  }
  searchBarFocus() {
    this.initHistory();
    // this.historyShow = false;    
  }
  getShopDetails(item) {
    item.followed = false;
    this.navCtrl.push(ShopDetailsPage, item);
  }
}








