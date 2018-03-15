var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { WebPage } from '../web/web';
import { PointsMallPage } from '../points-mall/points-mall';
import { BeautyPhotosPage } from '../beauty-photos/beauty-photos';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl } from '../../common/global';
import { NewsPage } from '../news/news';
import { JokePage } from '../joke/joke';
import { GamePage } from '../game/game';
export var ParkPage = (function () {
    function ParkPage(navCtrl, app, http) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.http = http;
        this.park_list = [];
        this.small_img_class = "img_120_90";
        // this.park_list = [{ img: "assets/img/ly_imge2@2x.png", header: "特朗普就职典礼", content: "百度视频", time: "01-20" },
        // { img: "assets/img/ly_imge1@2x.png", header: "新闻联播迎来新主播", content: "百度视频", time: "01-21" },];
        this.pard_grids = [
            { id: "wanghong", img: "assets/img/icon_wanghongzhibo@2x.png", txt: "网红直播" },
            { id: "meinv", img: "assets/img/icon_meinvzhaopian@2x.png", txt: "美女图片" },
            { id: "youxi", img: "assets/img/icon_qingsongyouxi@2x.png", txt: "轻松游戏" },
            { id: "kaixin", img: "assets/img/icon_kaixinyike@2x.png", txt: "开心一刻" }];
        this.park_title_banner = "assets/img/ly_bg_banner@2x.png";
    }
    ParkPage.prototype.ionViewDidLoad = function () {
        this.getTopNews();
    };
    ParkPage.prototype.goNextPage = function (id) {
        console.log("id==" + id);
        var nextPage;
        var data = {};
        switch (id) {
            case 'wanghong':
                nextPage = WebPage;
                data = {
                    title: '网红直播',
                    url: 'http://m.v.6.cn/live/u1?src=ummeda5263&forceback=1'
                };
                break;
            case 'meinv':
                nextPage = BeautyPhotosPage;
                break;
            case 'youxi':
                nextPage = GamePage;
                break;
            case 'kaixin':
                nextPage = JokePage;
                break;
            default:
                break;
        }
        this.app.getRootNav().push(nextPage, data);
    };
    ParkPage.prototype.getTopNews = function () {
        var _this = this;
        console.log('ts===' + new Date().getTime());
        var dataParams = {
            "bean": {
                newstype: 'top',
                createtime: new Date().getTime()
            },
            flipper: {
                limit: 10,
                offset: 10,
            }
        };
        this.http.httpMethodContext(HttpUrl.queryNews, dataParams, function (res, context) {
            for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                var item = _a[_i];
                var object = { img: '', header: '', content: '', time: '', newsurl: '' };
                object.img = item.imgurl;
                object.header = item.title;
                // object.content = '百度新闻';
                object.content = item.author;
                object.time = item.newsday;
                object.newsurl = item.newsurl;
                _this.park_list.push(object);
            }
        }, this);
    };
    ParkPage.prototype.goNewsDetails = function (newsurl) {
        this.app.getRootNav().push(WebPage, {
            title: '头条新闻',
            url: newsurl
        });
    };
    ParkPage.prototype.goNewsPage = function () {
        this.app.getRootNav().push(NewsPage);
    };
    ParkPage.prototype.goLivePage = function () {
        this.app.getRootNav().push(WebPage, {
            title: '网红直播',
            url: 'http://www.huajiao.com/mobile/index'
        });
    };
    ParkPage.prototype.goPointsMall = function () {
        this.app.getRootNav().push(PointsMallPage, {});
    };
    ParkPage = __decorate([
        Component({
            selector: 'page-park',
            templateUrl: 'park.html'
        }), 
        __metadata('design:paramtypes', [NavController, App, HttpGet])
    ], ParkPage);
    return ParkPage;
}());
//# sourceMappingURL=park.js.map