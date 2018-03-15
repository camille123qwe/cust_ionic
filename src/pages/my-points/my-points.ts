import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast } from '../../common/global';
import { PointsExchangePage } from '../PointsExchange/PointsExchange';
import { PointsDetailsPage } from '../points-details/points-details';
import { ExchangeRecordPage } from '../exchange-record/exchange-record';


@Component({
  selector: 'page-my-points',
  templateUrl: 'my-points.html'
})
export class MyPointsPage {
  shouldShowCancel: boolean = true;
  tab1_class;
  tab2_class;
  type: string;


  portrait: string;
  points: string = '';

  Voice = {
    list: [],
    last: 0,
    raw: [],
    show: false
  }
  Flows = {
    list: [],
    last: 0,
    raw: [],
    show: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
    this.portrait = 'http://c.diancall.com/dir/custuser_128/' + localStorage.getItem('custuser36id') + '.jpg' + '?t=' + new Date().getTime();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPointsPage');
    this.http.httpMethodContext(HttpUrl.myTrafficCharge, {}, (res, context) => {
      
      context.Flows = this.format(res.rows);
    }, this);
    this.http.httpMethodContext(HttpUrl.myVoiceCharge, {}, (res, context) => {
      context.Voice = this.format(res.rows);
    }, this);
    this.http.httpMethodContext(HttpUrl.myExper, {}, (res, context) => {
      context.points = res.result;
    }, this);

  }

  format(res) {
    let obj = {
      list: [],
      last: 0,
      raw: [],
      show: false
    };
    obj.list = res;
    obj.last = res.length - 1;
    if (res.length % 2 != 0) {
      obj.show = true;
      obj.raw.length = Math.floor(res.length / 2);

    } else {
      obj.show = false;
      obj.raw.length = res.length / 2;

    }
    for (let i = 0; i < obj.raw.length; i++) {
      obj.raw[i] = i;
    }
    return obj;

  }

  selectedLeft() {
    this.navCtrl.push(PointsDetailsPage);
  }
  selectedRight() {
    this.navCtrl.push(ExchangeRecordPage);
  }
  pointsExchange(id) {
    this.navCtrl.push(PointsExchangePage, { goods_id: id });
  }
}
