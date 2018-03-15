import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, } from 'ionic-angular';
import { MyVoucherPage } from '../my-voucher/my-voucher';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { ShopDetailsPage } from '../shop-details/shop-details';
/**
 * Generated class for the SignInSucceedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-in-succeed',
  templateUrl: 'sign-in-succeed.html',
})
export class SignInSucceedPage {
  gift_img = 'assets/img/qd_imge_tishi@2x.png';
  turntable_img = 'assets/img/imge_zhongjiang@2x.png';
  un_turntable_img = 'assets/img/imge_weizhongjiang@2x_94.png';
  giftname = '';
  signSucc;
  modelShow: boolean;
  turntable: boolean;
  prize = true;
  kankan = '';
  jixuchou = '';
  goodsInfo;
  storeInfo;
  goNext:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private http: HttpGet, ) {
    
    if (this.navParams.get('type') == 'truntable') {
      this.modelShow = true;
      this.signSucc = '';
      let relation = this.navParams.get('relations');
        // [
        //   {
        //     "discountid": 100004, "discountrelationid": "100004-0-jb4zbipl",
        //     "goodsInfos": [{
        //       "categoryid": "c.101", "createtime": 1508233806109,
        //       "detail": "可凭交易订单到店领取商品，相关详情请到店咨询<br>地址：漳浦县绥安镇麦市街东段怡景园1幢5号15880591615", "goods36id": "1njids",
        //       "goodsdesc": "无", "goodsface": "0igjcv431hn12v73selc78e1qv.jpg", "goodsid": 100007632, "goodsimgs": "2rinh4qsv1ob67c6j8q2rbg8ke.jpg",
        //       "goodsname": "店呼年卡", "goodsradio": 53, "groupid": "evvhj.104", "isrecommend": 0, "iswholesale": 0, "marketprice": 39800, "merchid": 30000553,
        //       "propValues": {}, "remark": "国内通话", "seen": 2, "sellprice": 9900, "status": 10, "stocks": 0, "storeid": 25001767, "unit": "张"
        //     }],
        //     "goodsids": "100007632", "type": 0
        //   }]
     

      if (typeof (relation) == 'undefined' || typeof (relation) == null || relation == [] || relation.length == 0) {
        this.turntable = false;
        this.giftname = this.navParams.get('data');
        this.kankan = '去看看';
        this.jixuchou = '继续抽奖';
      } else {
        this.giftname = this.navParams.get('data')
        this.turntable = false;
        this.kankan = '去购买';
        this.jixuchou = '放弃机会继续抽奖';
        this.prize = true;
        if(relation[0].hasOwnProperty("goodsInfos")){
          this.goNext=false;
          this.goodsInfo = relation[0]['goodsInfos'][0];
        }else if (relation[0].hasOwnProperty("storeInfos")) {

          // console.log('有门店');
          // console.log('storeInfos=='+relation[0].hasOwnProperty("storeInfos"));
          // console.log('goodsInfos=='+relation[0].hasOwnProperty("goodsInfos"));
          
          if(relation[0].hasOwnProperty("goodsInfos")){
            this.goNext=false;
            this.goodsInfo = relation[0]['goodsInfos'][0];
          }else{
            this.goNext=true;
            this.storeInfo = relation[0]['storeInfos'][0];
          }

        }
      

      }


    } else {
      this.signSucc = this.navParams.get('awarddetail');
      this.modelShow = false;
      this.giftname = '';
      if (typeof (this.navParams.get('awarddetail') == 'undefined') || this.navParams.get('awarddetail') == '') {
        this.signSucc = '恭喜签到成功'
      } else {
        this.signSucc = '恭喜获得' + this.navParams.get('awarddetail')
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInSucceedPage');
  }
  // MyVoucherPage
  present() {
    if (this.kankan == '去购买') {
      let goodsInfo = this.goodsInfo;
      let storeInfo = this.storeInfo;
      let data = { goodsInfo}
      // console.log(JSON.stringify(goodsInfo));
      // console.log(JSON.stringify(storeInfo));
      if (this.goNext==true) {
        // console.log('去门店')
        let url = HttpUrl.oneShopInfo + this.storeInfo.store36id
        this.http.httpMethodContext(url, {}, (res, context) => {
          let item = res;
          item.followed = false;
          // console.log(JSON.stringify(res))
          this.navCtrl.push(ShopDetailsPage, item);
        }, this)
      } else {
        // console.log('去商品')
        this.navCtrl.push('GoodsxiangqingPage', data);
      }
    } else if (this.kankan == '去看看') {
      let myModal = this.modalCtrl.create(MyVoucherPage);
      myModal.present();
    }

  }
  presentProfileModal() {

    this.navCtrl.pop();
  }


}
