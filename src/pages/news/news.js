var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl } from '../../common/global';
import { WebPage } from '../web/web';
export var NewsPage = (function () {
    function NewsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.small_img_class = "img_120_90";
        this.title_row1 = [{ id: 'top', name: '头条', tab_class: "text-actived" }, { id: 'shehui', name: '社会', tab_class: "text-off" }, { id: 'guonei', name: '国内', tab_class: "text-off" }, { id: 'guoji', name: '国际', tab_class: "text-off" }, { id: 'yule', name: '娱乐', tab_class: "text-off" }];
        this.title_row2 = [{ id: 'tiyu', name: '体育', tab_class: "text-off" }, { id: 'junshi', name: '军事', tab_class: "text-off" }, { id: 'keji', name: '科技', tab_class: "text-off" }, { id: 'caijing', name: '财经', tab_class: "text-off" }, { id: 'shishang', name: '时尚', tab_class: "text-off" }];
        this.news_list = [];
        this.last_select = this.title_row1[0];
        this.last_createtime = 0; //加載更多的時間戳
        this.current_type = 'top';
    }
    NewsPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad NewsPage');
        this.getNewsType();
        this.getNews('top');
    };
    NewsPage.prototype.getNewsType = function () {
        this.http.httpMethodContext(HttpUrl.newsType, {}, function (res, context) {
        }, this);
    };
    NewsPage.prototype.getNews = function (type) {
        var _this = this;
        var dataParams = {
            "bean": {
                newstype: type,
                createtime: this.last_createtime
            },
            flipper: {}
        };
        this.http.httpMethodContext(HttpUrl.queryNews, dataParams, function (res, context) {
            if (_this.last_createtime === 0) {
                _this.news_list = [];
            }
            for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                var item = _a[_i];
                var object = { img: '', header: '', content: '', time: '', newsurl: '' };
                object.img = item.imgurl;
                object.header = item.title;
                // object.content = '百度新闻';
                object.content = item.author;
                object.time = item.newsday;
                object.newsurl = item.newsurl;
                _this.news_list.push(object);
            }
            _this.last_createtime = res.rows[res.rows.length - 1].createtime;
        }, this);
    };
    NewsPage.prototype.goNewsDetails = function (newsurl) {
        this.navCtrl.push(WebPage, {
            title: '新闻',
            url: newsurl
        });
    };
    NewsPage.prototype.selectNews = function (item) {
        console.log('id==' + item.id);
        this.last_select.tab_class = 'text-off';
        item.tab_class = "text-actived";
        this.last_createtime = 0;
        this.current_type = item.id;
        this.getNews(item.id);
        this.last_select = item;
        this.content.scrollTo(0, 0, 200);
    };
    NewsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('加载更多');
            _this.getNews(_this.current_type);
            infiniteScroll.complete();
        }, 500);
    };
    __decorate([
        ViewChild(Content), 
        __metadata('design:type', Content)
    ], NewsPage.prototype, "content", void 0);
    NewsPage = __decorate([
        Component({
            selector: 'page-news',
            templateUrl: 'news.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], NewsPage);
    return NewsPage;
}());
//# sourceMappingURL=news.js.map