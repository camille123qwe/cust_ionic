import { Component } from '@angular/core';
import { HttpContents, HttpUrl, showToast } from '../../common/global';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { GlobalProvider }from '../../providers/global-provider';
@Component({
  selector: 'page-points-exchange',
  templateUrl: 'PointsExchange.html'
})
export class PointsExchangePage {
  goods_id: string;
  left_points: string;
  menu_name: string;
  cost_points: string;

  constructor(public globalProvider: GlobalProvider,public navCtrl: NavController, navParams: NavParams, private http: HttpGet,public alertCtrl: AlertController) {
    this.goods_id = navParams.get('goods_id');

    console.log('goods_id==' + this.goods_id);

    // this.left_points = "66666";
    // this.menu_name = "电信2G定向流量套餐";
    // this.cost_points = "5000";

  }
  ionViewDidLoad() {
    let url = HttpUrl.getOneExperthing + this.goods_id;
    this.http.httpMethodContext(url, {}, this.onSuccess, this);
    this.http.httpMethodContext(HttpUrl.myExper, {}, (res, context) => {
      console.log('我的积分=================='+JSON.stringify(res))
      context.left_points = res.result;
      
    }, this);

  }
  onExchange() {
    console.log('goods_id==' + this.goods_id);
    let url = HttpUrl.exchangePoints + this.goods_id;
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (res.retcode == 0) {
        showToast("积分兑换成功！");
        console.log("积分兑换成功！");
        context.navCtrl.pop();
      } else {
        let alert = context.alertCtrl.create({
          title:'暂不支持积分兑换',
          buttons:['确定']
        })
        alert.present();
      }
    }, this);
  }
  onSuccess(res, context) {
    // { "createtime":1484033137986, "display":1000, "experthing36id":"7pt", "experthingid":10001, "sellexper":5000, "status":10, "subtitle":"国内流量", "subtype":8, "title":"电信1G定向流量", "type":10, "value":1048576 }
    context.menu_name = res.title;
    context.cost_points = res.sellexper;
  }

}
