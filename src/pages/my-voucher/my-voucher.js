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
export var MyVoucherPage = (function () {
    function MyVoucherPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.type = 'left';
    }
    MyVoucherPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyVoucherPage');
    };
    MyVoucherPage.prototype.selectedLeft = function () {
        this.type = 'left';
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
    };
    MyVoucherPage.prototype.selectedRight = function () {
        this.type = 'right';
        this.tab1_class = "text-off";
        this.tab2_class = "text-actived";
    };
    MyVoucherPage = __decorate([
        Component({
            selector: 'page-my-voucher',
            templateUrl: 'my-voucher.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams])
    ], MyVoucherPage);
    return MyVoucherPage;
}());
//# sourceMappingURL=my-voucher.js.map