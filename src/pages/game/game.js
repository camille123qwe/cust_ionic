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
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl } from '../../common/global';
import { WebPage } from '../web/web';
export var GamePage = (function () {
    function GamePage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.last_createtime = 0; //加載更多的時間戳
        this.top_list = [];
        this.new_list = [];
        this.hot_list = [];
        this.left = {};
        this.middle = {};
        this.right = {};
        this.flipper_page = 0;
        this.total = 0;
    }
    GamePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GamePage');
        this.getData();
    };
    GamePage.prototype.getData = function () {
        this.getTop();
        this.getNew();
        this.getHot();
    };
    GamePage.prototype.getTop = function () {
        // {"createtime":14865328450000,"display":1000,"gameid":100001,"gameimg":"http://open.h5.gamedog.cn/Uploads/image/game/20161124/20161124184746_82337.png","gamename":"大圣西游","gametype":10,"gameurl":"http://sdk.h5.gamedog.cn/game/78/27/","status":10},
        this.http.httpMethodContext(HttpUrl.gameTop, {}, function (res, context) {
            context.top_list = res;
            context.middle = context.top_list[0];
            context.left = context.top_list[1];
            context.right = context.top_list[2];
        }, this);
    };
    GamePage.prototype.getNew = function () {
        this.http.httpMethodContext(HttpUrl.gameNew, {}, function (res, context) {
            context.new_list = res;
        }, this);
    };
    GamePage.prototype.getHot = function () {
        var data = {
            flipper: {
                offset: this.flipper_page
            }
        };
        this.http.httpMethodContext(HttpUrl.gameHot, data, function (res, context) {
            context.total = res.total;
            if (context.flipper_page === 0) {
                context.hot_list = res.rows;
            }
            else {
                for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                    var item = _a[_i];
                    context.hot_list.push(item);
                }
            }
        }, this);
    };
    GamePage.prototype.startGame = function (item) {
        this.navCtrl.push(WebPage, {
            title: item.gamename,
            url: item.gameurl
        });
    };
    GamePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('加载更多');
            if (_this.flipper_page < _this.total) {
                _this.flipper_page = _this.flipper_page + 20;
                _this.getHot();
                infiniteScroll.complete();
            }
            else {
            }
        }, 500);
    };
    GamePage = __decorate([
        Component({
            selector: 'page-game',
            templateUrl: 'game.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], GamePage);
    return GamePage;
}());
//# sourceMappingURL=game.js.map