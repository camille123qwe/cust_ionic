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
import { HttpUrl, showToast } from '../../common/global';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
export var PointsExchangePage = (function () {
    function PointsExchangePage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.goods_id = navParams.get('goods_id');
        console.log('goods_id==' + this.goods_id);
        // this.left_points = "66666";
        // this.menu_name = "电信2G定向流量套餐";
        // this.cost_points = "5000";
    }
    PointsExchangePage.prototype.ionViewDidLoad = function () {
        var url = HttpUrl.getOneExperthing + this.goods_id;
        this.http.httpMethodContext(url, {}, this.onSuccess, this);
        this.http.httpMethodContext(HttpUrl.myExper, {}, function (res, context) {
            context.left_points = res.result;
        }, this);
    };
    PointsExchangePage.prototype.onExchange = function () {
        console.log('goods_id==' + this.goods_id);
        var url = HttpUrl.exchangePoints + this.goods_id;
        this.http.httpMethodContext(url, {}, function (res, context) {
            if (res.retcode == 0) {
                showToast("积分兑换成功！");
                console.log("积分兑换成功！");
                context.navCtrl.pop();
            }
            else {
                alert(res.retinfo);
            }
        }, this);
    };
    PointsExchangePage.prototype.onSuccess = function (res, context) {
        // { "createtime":1484033137986, "display":1000, "experthing36id":"7pt", "experthingid":10001, "sellexper":5000, "status":10, "subtitle":"国内流量", "subtype":8, "title":"电信1G定向流量", "type":10, "value":1048576 }
        context.menu_name = res.title;
        context.cost_points = res.sellexper;
    };
    PointsExchangePage = __decorate([
        Component({
            selector: 'page-points-exchange',
            templateUrl: 'PointsExchange.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], PointsExchangePage);
    return PointsExchangePage;
}());
//# sourceMappingURL=PointsExchange.js.map