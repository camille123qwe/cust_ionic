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
import { NavController, ModalController } from 'ionic-angular';
import { ShopDetailsPage } from '../shop-details/shop-details';
import { CitySelectionPage } from '../city-selection/city-selection';
import { SearchShopPage } from '../search-shop/search-shop';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, constVar, globalVar } from '../../common/global';
export var FindPage = (function () {
    function FindPage(navCtrl, modalCtrl, http) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.myInput = '';
        this.img_class = 'small_img_class';
        this.city_page = CitySelectionPage;
        this.arround_shops = [];
        this.storefaceurl_300 = constVar.storefaceurl_300;
        this.flipper_page = 0;
        this.total = 0;
        this.city = '';
    }
    FindPage.prototype.ionViewDidLoad = function () {
        this.getArroundShop();
        this.city = globalVar.location.city;
    };
    FindPage.prototype.getArroundShop = function () {
        console.log('longitude==' + globalVar.location.longitude + ' latitude==' + globalVar.location.latitude);
        var data = {
            bean: {
                longitude: globalVar.location.longitude,
                latitude: globalVar.location.latitude,
                city: globalVar.location.city
            },
            flipper: {
                offset: this.flipper_page
            }
        };
        this.http.httpMethodContext(HttpUrl.arroundShops, data, function (res, context) {
            if (context.flipper_page === 0) {
                context.arround_shops = res.rows;
            }
            else {
                for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                    var item = _a[_i];
                    context.arround_shops.push(item);
                }
            }
            // context.fistNews.title = res.title;
            // context.fistNews.url = res.newsurl;
        }, this);
    };
    FindPage.prototype.onSearchInput = function (event) {
        var modal = this.modalCtrl.create(SearchShopPage);
        // modal.onDidDismiss(data => {
        //   let params = data.shop;
        //   if (typeof (params) !== 'undefined') {
        //   }
        // });
        modal.present();
    };
    FindPage.prototype.getShopDetails = function (item) {
        item.followed = false;
        this.navCtrl.push(ShopDetailsPage, item);
    };
    FindPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('加载更多');
            if (_this.flipper_page < _this.total) {
                _this.flipper_page = _this.flipper_page + 20;
                _this.getArroundShop();
                infiniteScroll.complete();
            }
            else {
                showToast('没有更多了...');
            }
        }, 500);
    };
    FindPage = __decorate([
        Component({
            selector: 'page-find',
            templateUrl: 'find.html'
        }), 
        __metadata('design:paramtypes', [NavController, ModalController, HttpGet])
    ], FindPage);
    return FindPage;
}());
//# sourceMappingURL=find.js.map