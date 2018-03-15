import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, saveLoginInfo } from '../../common/global';
import { WebPage } from '../web/web';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  @ViewChild(Content) content: Content;

  small_img_class = "img_120_90";
  title_row1 = [{ id: 'top', name: '头条', tab_class: "text-actived" }, { id: 'shehui', name: '社会', tab_class: "text-off" }, { id: 'guonei', name: '国内', tab_class: "text-off" }, { id: 'guoji', name: '国际', tab_class: "text-off" }, { id: 'yule', name: '娱乐', tab_class: "text-off" }];
  title_row2 = [{ id: 'tiyu', name: '体育', tab_class: "text-off" }, { id: 'junshi', name: '军事', tab_class: "text-off" }, { id: 'keji', name: '科技', tab_class: "text-off" }, { id: 'caijing', name: '财经', tab_class: "text-off" }, { id: 'shishang', name: '时尚', tab_class: "text-off" }];

  news_list = [];
  last_select = this.title_row1[0];
  last_createtime = 0;  //加載更多的時間戳
  current_type = 'top';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewsPage');
    this.getNewsType();
    this.getNews('top');

  }

  getNewsType() {

    this.http.httpMethodContext(HttpUrl.newsType, {}, (res, context) => {

    }, this);
  }
  getNews(type) {
    let dataParams = {
      "bean": {
        newstype: type,
        createtime: this.last_createtime
      },
      flipper: {
        // limit: 10,
        // offset: 10,
        // sort:
      }
    }

    this.http.httpMethodContext(HttpUrl.queryNews, dataParams, (res, context) => {
      if (this.last_createtime === 0) {
        this.news_list = [];
      }
      for (let item of res.rows) {
        let object = { img: '', header: '', content: '', time: '', newsurl: '' };
        object.img = item.imgurl;
        object.header = item.title;
        // object.content = '百度新闻';
        object.content = item.author;
        object.time = item.newsday;
        object.newsurl = item.newsurl;

        this.news_list.push(object);
      }

      this.last_createtime = res.rows[res.rows.length - 1].createtime;
    }, this);
  }
  goNewsDetails(newsurl) {
    this.navCtrl.push(WebPage, {
      title: '新闻',
      url: newsurl

    });
  }
  selectNews(item) {
    console.log('id==' + item.id);
    this.last_select.tab_class = 'text-off';
    item.tab_class = "text-actived";

    this.last_createtime = 0;
    this.current_type = item.id;

    this.getNews(item.id);
    this.last_select = item;
    this.content.scrollTo(0, 0, 200);

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      console.log('加载更多');
      this.getNews(this.current_type);
      infiniteScroll.complete();

    }, 200);
  }
}
