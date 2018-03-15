import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast } from '../../common/global';

@Component({
  selector: 'page-points-details',
  templateUrl: 'points-details.html'
})
export class PointsDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsDetailsPage');

    this.getData();

  }
  getData() {
    let dataParams = {
      bean: {
        exptype:10,	//short	积分记录类型: 10: 新增; 20: 消耗;
      },
      flipper:{
        limit:10,
        offset:10,
        // sort:
      }
    }
    this.http.httpMethodContext(HttpUrl.experDetails, dataParams, (res, context) => {
      // context.Flows = this.format(res.rows);
    }, this);
  }

}
