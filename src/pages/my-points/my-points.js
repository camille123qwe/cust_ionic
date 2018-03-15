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
import { PointsExchangePage } from '../PointsExchange/PointsExchange';
import { PointsDetailsPage } from '../points-details/points-details';
import { ExchangeRecordPage } from '../exchange-record/exchange-record';
export var MyPointsPage = (function () {
    function MyPointsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.shouldShowCancel = true;
        this.points = '';
        this.Voice = {
            list: [],
            last: 0,
            raw: [],
            show: false
        };
        this.Flows = {
            list: [],
            last: 0,
            raw: [],
            show: false
        };
        this.portrait = 'assets/img/wd_imge@2x.png';
    }
    MyPointsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad MyPointsPage');
        this.http.httpMethodContext(HttpUrl.myTrafficCharge, {}, function (res, context) {
            context.Flows = _this.format(res.rows);
        }, this);
        this.http.httpMethodContext(HttpUrl.myVoiceCharge, {}, function (res, context) {
            context.Voice = _this.format(res.rows);
        }, this);
        this.http.httpMethodContext(HttpUrl.myExper, {}, function (res, context) {
            context.points = res.result;
        }, this);
    };
    MyPointsPage.prototype.format = function (res) {
        var obj = {
            list: [],
            last: 0,
            raw: [],
            show: false
        };
        obj.list = res;
        obj.last = res.length - 1;
        if (res.length % 2 != 0) {
            obj.show = true;
            obj.raw.length = Math.floor(res.length / 2);
        }
        else {
            obj.show = false;
            obj.raw.length = res.length / 2;
        }
        for (var i = 0; i < obj.raw.length; i++) {
            obj.raw[i] = i;
        }
        return obj;
    };
    MyPointsPage.prototype.selectedLeft = function () {
        this.navCtrl.push(PointsDetailsPage);
    };
    MyPointsPage.prototype.selectedRight = function () {
        this.navCtrl.push(ExchangeRecordPage);
    };
    MyPointsPage.prototype.pointsExchange = function (id) {
        this.navCtrl.push(PointsExchangePage, { goods_id: id });
    };
    MyPointsPage = __decorate([
        Component({
            selector: 'page-my-points',
            templateUrl: 'my-points.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], MyPointsPage);
    return MyPointsPage;
}());
//# sourceMappingURL=my-points.js.map