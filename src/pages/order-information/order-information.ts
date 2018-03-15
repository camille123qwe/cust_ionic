import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { showToast, constVar, globalVar, isLogin, HttpUrl, initFunction } from '../../common/global';
/**
 * Generated class for the OrderInformationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-information',
  templateUrl: 'order-information.html',
})
export class OrderInformationPage {

  custgoodsorderid;
  custshippingaddressid;
  discountdetail;
  discountlist;
  discountinfo;
  loading;
  storeInfo = {};
  custOrder2Goodses = [];
  totalgoodsprice;
  expressmoney: Number;
  wuliu = true;//是否显示物流信息，未支付的订单不显示
  zhifu = false;//是否显示支付按钮
  shouhuo = false;//是否显示确认收货按钮
  wancheng = false;
  tuikuancuidan = false;
  show_more = true;//显示更多
  orderitem: any;
  ordertype = "";
  shouhuo_status = "";
  shouhuo_method = "";
  tuihuo_status = "";
  tuihuo_method = "";
  yoursName = ''; yoursPhone = ''; yoursAddr = '';
  orderInfo;
  totalcount;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public actionCtrl: ActionSheetController, public alertCtrl: AlertController, private http: HttpGet, public loadingCtrl: LoadingController) {

    this.custgoodsorderid = this.navParams.data.item.custgoodsorderid;
    this.custshippingaddressid = this.navParams.data.item.custshippingaddressid;
    this.totalcount = this.navParams.data.item.totalcount;
    this.storeInfo = this.navParams.data.item.storeInfo;
    this.expressmoney = this.navParams.data.item.expressmoney;
    this.totalgoodsprice = this.navParams.data.item.totalgoodsprice;
    this.custOrder2Goodses = this.navParams.data.item.custOrder2Goodses;
    this.ordertype = this.navParams.data.type;
    this.orderitem = this.navParams.data.item;
    console.log('订单信息' + JSON.stringify(this.navParams.data));
    console.log('订单ID' + this.custgoodsorderid + '商品数量' + this.totalcount);
    console.log('订单地址ID' + this.custshippingaddressid);
    this.init();
    this.chaxunAddr();
    this.searchPacket();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitPaymentPage');
  }
  

  init() {
    if (this.ordertype == "zhifu") {
      this.wuliu = false;
      this.zhifu = true;
    } else if (this.ordertype == "shouhuo") {
      this.show_more = false;
      this.shouhuo = true;
      if (this.orderitem.status == 3 || this.orderitem.status == 10) {
        this.shouhuo_status = "订单已支付";
        this.shouhuo_method = "确认收货";
      } else if (this.orderitem.status == 2 || this.orderitem.status == 8 || this.orderitem.status == 9) {
        this.shouhuo_status = "已付款 商家未发货";
        this.shouhuo_method = "催单";
      }

    } else if (this.ordertype == "wancheng") {
      this.show_more = false;
      this.wancheng = true;
    } else if (this.ordertype == "tuikuan") {
      this.tuikuancuidan = true;
      this.show_more = false;
      if (this.orderitem.status == 6) {
        this.tuihuo_status = "申请退货中";
        this.tuihuo_method = "催单";
      } else if (this.orderitem.status == 11) {
        this.tuihuo_status = "退货申请已通过";
        this.tuihuo_method = "去发货";
      } else if (this.orderitem.status == 12) {
        this.tuihuo_status = "退货申请被拒绝";
        this.tuihuo_method = "再次申请";
      }

    }
  }
  payment() {
    console.log('click payment');
    let price = parseFloat(this.totalgoodsprice);
    if (price <= 0) {
      console.log('价格不满足要求');
      let alert = this.alertCtrl.create({
        title: '价格不满足要求',
        buttons: ['确定']
      })
      alert.present();
      return;
    }
    if (this.yoursAddr.length <= 0) {
      console.log('请选择地址');
      let alert = this.alertCtrl.create({
        title: '请选择地址',
        buttons: ['确定']
      })
      alert.present();
      return;
    }
    this.commitOrderInfo();
    // this.navCtrl.push('PaymentPage', { 'custgoodsorderid': this.custgoodsorderid, 'totalprice': this.totalgoodsprice, 'type': "orderservice" });
  }

  commitOrderInfo() { // 提交支付的时候提交修改订单信息
    let confirmInfo = {"custgoodsorderid":"","custshippingaddressid":"","discountid":0};//"custgoodsorderid":"","custshippingaddressid":"","discountid":""
    if(this.custgoodsorderid && this.custshippingaddressid){ // 判断是否有订单id && 地址id
      confirmInfo.custgoodsorderid = this.custgoodsorderid;
      confirmInfo.custshippingaddressid = this.custshippingaddressid;
    }
    if (this.discountinfo) { // 判断是否有折扣
      confirmInfo.discountid = this.discountinfo.discountid;
    }
    let data = {
      'bean': confirmInfo,
    };
    this.http.httpMethodContext(HttpUrl['confirmorder'], data, (res, context) => {
      console.log('commitOrderInfo' + JSON.stringify(res));
    }, this);
    this.loading = this.loadingCtrl.create({
      content: '上传数据中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
      this.navCtrl.push('PaymentPage', { 'custgoodsorderid': this.custgoodsorderid, 'totalprice': this.totalgoodsprice, 'type': "orderservice" });
    }, 3000);
  }

  querenshouhuo() {
    if (this.orderitem.status == 3 || this.orderitem.status == 10) {
      const alert = this.actionCtrl.create({
        title: '您确定您已经收到所有商品了吗',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '确定',
            handler: () => {
              this.http.httpMethodContext(HttpUrl['confirmgoodsorder'] + this.custgoodsorderid, {}, (res, context) => {
                showToast("操作成功");
                console.log("操作成功");
                this.navCtrl.pop();
              }, this)
            }
          }
        ]
      });
      alert.present();
    } else if (this.orderitem.status == 2 || this.orderitem.status == 8 || this.orderitem.status == 9) {
      const alert = this.alertCtrl.create({
        title: '催单成功',
        subTitle: '催单请求已经发送给商家,请您等待商家回复',
        buttons: ['确定']
      });
      alert.present();
      this.http.httpMethodContext(HttpUrl['reminder'] + this.custgoodsorderid, {}, (res, context) => {
        console.log(res);

      }, this)
    }

  }
  cuidan() {
    if (this.orderitem.status == 6) {
      const alert = this.alertCtrl.create({
        title: '催单成功',
        subTitle: '催单请求已经发送给商家,请您等待商家回复',
        buttons: ['确定']
      });
      alert.present();
      this.http.httpMethodContext(HttpUrl['reminder'] + this.custgoodsorderid, {}, (res, context) => {
        console.log(res);

      }, this)
    } else if (this.orderitem.status == 11) {
      //进入发货页面
      this.navCtrl.push('');
    } else if (this.orderitem.status == 12) {
      //进入催单页面
      this.navCtrl.push('');
    }


  }
  more() {
    const zhifuSheet = this.actionCtrl.create({
      buttons: [
        {
          text: '取消订单',
          role: 'destructive',
          handler: () => {
            const alert = this.actionCtrl.create({
              title: '您确定取消此订单吗',
              buttons: [
                {
                  text: '我再想想',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: '确定',
                  handler: () => {
                    this.http.httpMethodContext(HttpUrl['cancelgoodsorder'] + this.custgoodsorderid, {}, (res, context) => {
                      showToast("操作成功");
                      console.log("操作成功");
                      this.navCtrl.pop();
                    }, this)
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    const wanchengSheet = this.actionCtrl.create({
      buttons: [
        {
          text: '申请退货',
          role: 'destructive',
          handler: () => {
            console.log("老娘要退货！！！！！！！！！！！！！！！！");
          }

        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    if (this.ordertype == "zhifu") {
      zhifuSheet.present();
    } else if (this.ordertype == "wancheng") {
      wanchengSheet.present();
    }

  }

  updateAddr() {
    console.log(0)
    this.navCtrl.push('SelectaddressPage',{callback: this.getAddr});
  }

  // 查询订单地址
  chaxunAddr() {
    if (this.custshippingaddressid) {
      console.log('有地址id')
      let data = {
      };
      let url = HttpUrl['findaddress'] + this.custshippingaddressid;
      console.log('url:' + url);
      this.http.httpMethodContext(url, data, (res, context) => {
        console.log('订单ID查询订单地址' + JSON.stringify(res));
        if (res != null) { //根据地址id查询到地址
          console.log('根据地址id查询到地址'+res.address);
          context.yoursName = res.receivername;
          context.yoursPhone = res.mobile;
          context.yoursAddr = res.address;
          context.hasAddr = true;
          context.orderInfo = res;
        } else { // 需要查询默认地址
          this.searchDefaultAddr()
        }
      }, this);
    }else{
      this.searchDefaultAddr();
    }
  }

  // 查询默认地址
  searchDefaultAddr() {
    console.log('需要查询默认地址');
          let data = {
            'bean': {
              custuserid: localStorage.getItem('custuserid'),
              defaultorno: 10
            }, 'cols': '[""]'
          };
          this.http.httpMethodContext(HttpUrl['shipAddr'], data, (res, context) => {
            if (res.length > 0) {
              context.yoursName = res[0].receivername;
              context.yoursPhone = res[0].mobile;
              context.yoursAddr = res[0].address;
              context.hasAddr = true;
              context.orderInfo = res[0];
            }
          }, this);
  }

  // 查询优惠信息
  searchPacket() {
    let data = {
    };
    let url = HttpUrl['searchpacket'] + this.custgoodsorderid;
    console.log('url' + url);
    this.http.httpMethodContext(url, data, (res, context) => {
      console.log('searchPacket res:' + res.total);
      context.discountdetail = res.total + '个可用';
      context.discountlist = res;
    }, this);
  }

  clickPacket() {
    console.log('clickPacket()');
    this.navCtrl.push('SelectpacketPage', { 'discountlist': this.discountlist, callback: this.getPacket });
  }

  getPacket = (data) => {
    return new Promise((resolve, reject) => {
      console.log('优惠标题：' + data.title + '满减：' + data.ifmoneyneed + '减钱：' + data.discountmoney + '折扣：' + data.discountpercent);
      this.discountinfo = data;
      console.log('优惠id' + data.discountid);
      if (data.discountmoney > 0) {
        this.discountdetail = '-￥' + data.discountmoney;
        let price = parseFloat(this.totalgoodsprice) - data.discountmoney;
        this.totalgoodsprice = price;
      } else if (data.discountpercent > 0) {
        this.discountdetail = data.discountpercent / 10 + '折';
        let price = parseFloat(this.totalgoodsprice) * data.discountpercent / 100;
        this.totalgoodsprice = price;
      } else {
        this.discountdetail = '请选择其它有效优惠';
      }
      resolve();
    });
  };

  getAddr = (data) => {
    return new Promise((resolve, reject) => {
      console.log('姓名：' + data.receivername + '电话：' + data.mobile + '地址：：' + data.address +'ID:'+ data.custshippingaddressid);
      if (data.address.length > 0) {
        this.yoursName = data.receivername;
        this.yoursPhone = data.mobile;
        this.yoursAddr = data.address;
        this.custshippingaddressid = data.custshippingaddressid;
      } else{
        console.log('没有选择合适的地址');
      }
      resolve();
    });
  };
}
