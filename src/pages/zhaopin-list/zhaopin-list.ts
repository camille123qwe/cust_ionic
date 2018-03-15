import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, globalVar } from '../../common/global';
import { ZhaopinDetailsPage } from '../zhaopin-details/zhaopin-details';


@Component({
  selector: 'page-zhaopin-list',
  templateUrl: 'zhaopin-list.html',
})
export class ZhaopinListPage {

  listData = { rows: [], offset: 0, total: 0 };  //未读
  xiSh = true;
  infiniteScroll;
  limit = 20;
  loadingShops = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZhaopinListPage');
    this.getData(this.infiniteScroll);

  }
  toDetails(item) {
    this.navCtrl.push(ZhaopinDetailsPage, item);
  }
  getData(infiniteScroll) {
    this.loadingShops = true;
    let dataParams = {
      flipper: {
        limit: this.limit,
        offset: this.listData.offset,
        // sort: 'createtime DESC'
      },
      bean: {
        status: [10],
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude
      }
    }
    this.http.httpMethodContext(HttpUrl.jobList, dataParams, (res, context) => {
      context.loadingShops = false;
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }
      for (let item of res.rows) {
        if (item.salery) {
          item.saleryshow = item.salery / 100;
        }else{
          item.saleryshow = '面议';        
        }
        //距离
        if (item.distance == 0) {
          item.storeInfo.distanceShow = '';
        } else if (item.distance <= 1000) {

          item.storeInfo.distanceShow = "<" + 10 + "m";

        } else if (item.distance >= 100000) {

          item.storeInfo.distanceShow = Math.floor(item.distance / 1000) / 100 + "km"

        } else {

          item.storeInfo.distanceShow = Math.floor(item.distance / 100) + "m";

        }


      }
      context.listData.total = res.total;
      if (context.listData.offset == 0) {
        context.listData.rows = res.rows;
      } else {
        for (let item of res.rows) {
          context.listData.rows.push(item);
        }
      }


      if (res.rows.length == 0) {
        context.xiSh = false;
      }

    }, this);
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;

    if (this.listData.offset + this.limit < this.listData.total && !this.loadingShops) {
      console.log('加载更多');
      this.listData.offset += this.limit;
      this.getData(infiniteScroll);
    }
    infiniteScroll.complete();
    // }, 200);
  }
}
