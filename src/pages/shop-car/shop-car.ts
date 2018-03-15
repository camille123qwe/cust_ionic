import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpUrl, showToast, constVar, globalVar, isLogin, goLogin } from '../../common/global';
import { CitySelectionPage } from '../city-selection/city-selection';
import { HttpGet } from '../../providers/http-get';
/**
 * Generated class for the ShopCarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-car',
  templateUrl: 'shop-car.html',
})
export class ShopCarPage {
  shopcart = [];
  goodsNum = 0;
  money = 0;
  url_900 = constVar.goodsfaceurl_900;
  storefaceurl_300 = constVar.storefaceurl_300;
  tishi: boolean;
  cartid = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: HttpGet, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopCarPage');

  }

  ionViewDidEnter() {
    this.chaxun();
    this.payList();
  }


  //是否全选
  mendian(data, item) {
    // this.money=0;
    let paystatus = false;
    //如果门店为选中  则该门店下所以商品都选中
    for (let obj of item) {
      
      // console.log('xxx=='+obj.goodsStatus)
      if (obj.goodsStatus == true) {
        // this.goodsNum =this.goodsNum-obj.count;
        if(this.goodsNum>0){
          this.goodsNum =this.goodsNum-obj.count;
        }else{
          this.goodsNum=0;
        }
        // console.log('9900=='+JSON.stringify(obj))
        this.money = this.money - 0;
        // obj.sellprice
        paystatus = true;
      } else {
        this.goodsNum =this.goodsNum+obj.count;
        this.money = this.money + obj.goodsInfo.sellprice * obj.count;
      }
      if (data == true) {
        obj.goodsStatus = true;
        // this.money=this.money+obj.sellprice
      } else {
        obj.goodsStatus = false;
        // if(paystatus==false){
        if (this.money > 0) {
          this.money = this.money - obj.goodsInfo.sellprice * obj.count
        } else {
          this.money = 0;
        }
        // }else{
        //    this.money=this.money+obj.sellprice
        // }

      }

    }

  }

  //是否全选
  thisGoods(data, item, str) {
    // console.log('111111'+JSON.stringify(data));
    // console.log('222222'+JSON.stringify(item));
    // console.log('333333'+JSON.stringify(str));
    //找到选中的商品
    let arrLength = [];
    for (let obj of item) {
      if (obj.goodsStatus == true) {
        arrLength.push(obj.goodsStatus);
      }
      // console.log('aaaaaa=' + JSON.stringify(str.props));
    }

    //如果该门店下所以商品都选中则  门店为选中
    for (let arr of this.shopcart) {
      if (item == arr) {
        if (arrLength.length == arr.length) {
          arr.payStatus = true;
        } else {
          arr.payStatus = false;
        }
      }
    }
    //计算选中商品的总价钱
    if (str.goodsStatus == true) {
      this.money = this.money + str.goodsInfo.sellprice * str.count;
      this.goodsNum =this.goodsNum+str.count;
    } else {
      
      if(this.goodsNum>0){
        this.goodsNum =this.goodsNum-str.count;
      }else{
        this.goodsNum=0;
      }
      if (this.money > 0) {
        this.money = this.money - str.goodsInfo.sellprice * str.count
      } else {
        this.money = 0;
      }

    }
  }

  onClickUnFolow(obj, item) {
    let confirm = this.alertCtrl.create({
      // title: '',
      message: '是否删除?',
      buttons: [
        {
          text: '确定',
          handler: () => {
            // console.log('agree clicked');
            this.unFollow(obj, item)
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  unFollow(obj, item) {
    console.log(JSON.stringify(obj))
    console.log(JSON.stringify(item))
    let data = {
      "shopcartids": '[' + obj.cartgoodsitemsid + ']',
    }

    this.http.httpMethodContext(HttpUrl.deletecustcart, data, function (res, context) {
      if (res.retcode == 0) {
        showToast('删除成功');
        item.splice(item.indexOf(obj), 1);
        if (item.length == 0) {
          item.nameshow = false;
        }
      } else {
        showToast('删除失败')
      }
    }, this)



  }
  // order(){
  //   console.log('ssss')
  //   this.navCtrl.push(CitySelectionPage)
  // }

  chaxun() {
    // 
    this.shopcart = []
    this.money = 0;
    let data = {
      'bean': {

      }
    }
    this.http.httpMethodContext(HttpUrl.mycustcart, data, function (res, context) {
      console.log('5666')
      let name = Object.keys(res.result)
      for (let item of name) {
        res.result[item].thisStoreName = item;
        res.result[item].payStatus = false;
        for (let obj of res.result[item]) {
          obj.goodsStatus = false;
        }
        context.shopcart.push(res.result[item]);
      }
      context.payList();
    }, this)
  }

  payList() {
    let goodsLength = [];
    if (this.shopcart.length == 0) {
      this.tishi = true;
      // console.log(this.shopcart.length)
    } else {
      this.tishi = false;
      // console.log(this.shopcart.length)
    }
    for (let i = 0; i < this.shopcart.length; i++) {
      // console.log('xxxxxxx=====' + JSON.stringify(this.shopcart[i]));
      this.shopcart[i].nameshow = true;
      for (let item of this.shopcart[i]) {

        goodsLength.push(item);
        this.cartid.push(item.shopcartid)
      }
    }
    // console.log('ididiidid==='+JSON.stringify(this.cartid))
    // this.goodsNum = goodsLength.length
  }

  order() {
    console.log(JSON.stringify(this.shopcart))
    let oders = [];
    if (this.goodsNum == 0) {
      let alert = this.alertCtrl.create({
        title: '您还没有选择宝贝哟！',
        buttons: ['确定'],
      })
      alert.present();
      // showToast('您还没有选择宝贝哟！')
    } else {
      // console.log('生成订单')


      let arr = [];
      let cartids = '';
      for (let i = 0; i < this.shopcart.length; i++) {

        if (this.shopcart[i][0].goodsStatus == true) {
          oders.push(this.shopcart[i][0])
          console.log(oders.length);
        }
        for (let item of this.shopcart[i]) {
          if (item.goodsStatus == true) {
            arr.push(item.cartgoodsitemsid)
          }
        }
      };
      // 获取以选择商品的购物车id
      if (arr.length == 0) {
        let alert = this.alertCtrl.create({
          title: '您还没有选择宝贝哟！',
          buttons: ['确定'],
        })
        alert.present();
        return;
      }

      cartids = arr.join(",");
      if (oders.length >= 2) {
        let alert = this.alertCtrl.create({
          title: '您添加多个门店的商品,<br>将生成多个订单',
          buttons: ['确定'],
        })
        alert.present();
      }
      let data = {
        "shopcartids": '[' + cartids + ']',
      };
      console.log(JSON.stringify(cartids))
      this.http.httpMethodContext(HttpUrl.goodsorder, data, function (res, context) {
        if (res.retcode == 0) {
          console.log(JSON.stringify(res));
          context.navCtrl.push('OrderOfGoodsPage')
        }

      }, this)

    }

  }
}
