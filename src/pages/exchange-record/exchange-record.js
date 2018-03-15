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
export var ExchangeRecordPage = (function () {
    function ExchangeRecordPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ExchangeRecordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExchangeRecordPage');
        this.getData();
    };
    ExchangeRecordPage.prototype.getData = function () {
        var dataParams = {
            bean: {
                exptype: 20,
            },
            flipper: {
                limit: 10,
                offset: 10,
            }
        };
        this.http.httpMethodContext(HttpUrl.experExchangeRecords, dataParams, function (res, context) {
            // context.Flows = this.format(res.rows);
        }, this);
    };
    ExchangeRecordPage = __decorate([
        Component({
            selector: 'page-exchange-record',
            templateUrl: 'exchange-record.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], ExchangeRecordPage);
    return ExchangeRecordPage;
}());
//# sourceMappingURL=exchange-record.js.map