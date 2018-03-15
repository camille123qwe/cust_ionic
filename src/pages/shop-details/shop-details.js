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
import { NavController, NavParams, App } from 'ionic-angular';
import { ShopSettingPage } from '../shop-setting/shop-setting';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, constVar } from '../../common/global';
import { LoginPage } from '../login/login';
export var ShopDetailsPage = (function () {
    // [{"city":"深圳市","createtime":1486536440817,"distance":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storename":"尚美酒店大冲测试点"},{"city":"深圳市","createtime":1486540997349,"distance":0,"goodsradio":53,"latitude":22.539,"longitude":113.929469,"merchid":30000002,"status":10,"store36id":"evu4i","storeaddr":"南山桃园路1号","storeface":"0m2cn2bfu5044ogumj1nql0b68.jpg","storeid":25000002,"storeimgs":"65b4ee97t7o0knu3102dl6o032.jpg;54pkqdchls3mqmt8ctff0bufor.jpg","storename":"尚美酒店桃园测试点"}]
    //从我的门店跳转而来
    // {"buycount":1000,"custstoreid":"3b2ozm-evu4h","custuserid":200000002,"followtime":1487143706688,"forbidtime":0,"pushtype":10,"saleuserid":0,"store":{"city":"深圳市","costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1486536440817,"custusercount":1,"distance":0,"goodscount":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"msmscount":0,"quancount":0,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storeman":"张生","storename":"尚美酒店大冲测试点"},"storeid":25000001,"weight":1000}
    function ShopDetailsPage(navCtrl, navParams, app, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.http = http;
        this.title_banner = "";
        this.img_class = 'middle_img';
        this.folowed = true;
        this.goods_list = [];
        this.goodsface_300 = constVar.goodsfaceurl_300;
        this.setting_page = ShopSettingPage;
        this.initData();
    }
    ShopDetailsPage.prototype.initData = function () {
        if (this.navParams.data.followed) {
            //从我的门店跳转而来
            this.shopInfo = this.navParams.data.store;
        }
        else {
            this.shopInfo = this.navParams.data;
        }
        this.title_banner = constVar.storefaceurl_900 + this.shopInfo.storeface;
        this.folowed = this.navParams.data.followed;
        if (typeof this.shopInfo.storetel == 'undefined' || this.shopInfo.storetel == 'null') {
            this.shopInfo.storetel = '暂无';
        }
    };
    ShopDetailsPage.prototype.getGoods = function (id) {
        // {"rows":[{"createtime":1486540143814,"goods36id":"1njcht","goodsface":"0sbrdp5njm3p64f8nhql8ngetn.jpg","goodsid":100000001,"goodsname":"总统套房","goodsradio":53,"groupid":"evu4h.101","marketprice":3500,"merchid":30000002,"sellprice":3000,"status":10,"stocks":0,"storeid":25000001},{"createtime":1486543253196,"goods36id":"1njchu","goodsface":"1ck007sd9b4eork1dhjvmm43h9.jpg","goodsid":100000002,"goodsname":"双人豪华房","goodsradio":53,"groupid":"evu4h.101","marketprice":2000,"merchid":30000002,"sellprice":1500,"status":10,"stocks":0,"storeid":25000002}],"total":2}
        var _this = this;
        var url = HttpUrl.shopGoods + id; //#	int	门店36ID    
        this.http.httpMethodContext(url, {}, function (res, context) {
            _this.goods_list = res.rows;
        }, this);
    };
    ShopDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShopDetailsPage');
        this.getGoods(this.shopInfo.store36id);
    };
    ShopDetailsPage.prototype.toFollow = function () {
        var custuserid = localStorage.getItem('custuserid');
        if (custuserid == null || custuserid === 'undefined') {
            console.log('未登录');
            this.navCtrl.push(LoginPage, {});
            return false;
        }
        else {
            var url = HttpUrl.followShop + this.shopInfo.store36id; //#	int	门店36ID
            this.http.httpMethodContext(url, {}, function (res, context) {
                // showToast('关注成功');
                context.folowed = true;
            }, this);
        }
    };
    ShopDetailsPage = __decorate([
        Component({
            selector: 'page-shop-details',
            templateUrl: 'shop-details.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, App, HttpGet])
    ], ShopDetailsPage);
    return ShopDetailsPage;
}());
//# sourceMappingURL=shop-details.js.map