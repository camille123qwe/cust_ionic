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
import { HttpUrl, code2Html } from '../../common/global';
export var JokePage = (function () {
    function JokePage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.last_createtime = 0; //加載更多的時間戳
        this.list = [];
        console.log(code2Html('aaa\nbbb&nbsp'));
    }
    JokePage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    JokePage.prototype.getData = function () {
        var _this = this;
        var dataParams = {
            "bean": {
                createtime: this.last_createtime
            }
        };
        this.http.httpMethodContext(HttpUrl.queryjoke, dataParams, function (res, context) {
            if (_this.last_createtime === 0) {
                _this.list = [];
            }
            for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                var item = _a[_i];
                // item.content = code2Html(item.content);
                _this.list.push(item);
            }
            _this.last_createtime = res.rows[res.rows.length - 1].createtime;
        }, this);
    };
    JokePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('加载更多');
            _this.getData();
            infiniteScroll.complete();
        }, 500);
    };
    JokePage = __decorate([
        Component({
            selector: 'page-joke',
            templateUrl: 'joke.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], JokePage);
    return JokePage;
}());
//# sourceMappingURL=joke.js.map