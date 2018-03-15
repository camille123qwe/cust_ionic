import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, code2Html } from '../../common/global';

@Component({
  selector: 'page-joke',
  templateUrl: 'joke.html'
})
export class JokePage {
  last_createtime = 0;  //加載更多的時間戳
  list = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
    console.log(code2Html('aaa\nbbb&nbsp'));
  }
  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    let dataParams = {
      "bean": {
        createtime: this.last_createtime
      }
    }
    this.http.httpMethodContext(HttpUrl.queryjoke, dataParams, (res, context) => {
      if (this.last_createtime === 0) {
        this.list = [];
      }
      for (let item of res.rows) {
        // item.content = code2Html(item.content);
        this.list.push(item);
      }

      this.last_createtime = res.rows[res.rows.length - 1].createtime;
    }, this);
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      console.log('加载更多');
      this.getData();
      infiniteScroll.complete();

    }, 200);
  }
}
