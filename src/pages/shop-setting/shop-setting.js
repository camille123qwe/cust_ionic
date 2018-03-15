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
export var ShopSettingPage = (function () {
    function ShopSettingPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.title = "八马茶业国贸店";
        this.openPush = true;
    }
    ShopSettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShopSettingPage');
    };
    // ionViewWillLeave() {
    //   if (this.openPush) {
    //     this.allowPush();
    //   } else {
    //     this.forbitPush();
    //   }
    // }
    ShopSettingPage.prototype.allowPush = function () {
        var url = HttpUrl.shopAllowPush + ''; //#	int	门店36ID
        this.http.httpMethodContext(url, {}, function (res, context) {
        }, this);
    };
    ShopSettingPage.prototype.forbitPush = function () {
        var url = HttpUrl.shopForbitPush + ''; //#	int	门店36ID
        this.http.httpMethodContext(url, {}, function (res, context) {
        }, this);
    };
    ShopSettingPage = __decorate([
        Component({
            selector: 'page-shop-setting',
            templateUrl: 'shop-setting.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], ShopSettingPage);
    return ShopSettingPage;
}());
//# sourceMappingURL=shop-setting.js.map