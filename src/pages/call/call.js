var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { CallProvider } from '../../providers/call-provider';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl } from '../../common/global';
export var CallPage = (function () {
    function CallPage(navCtrl, popoverCtrl, call, http) {
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.call = call;
        this.http = http;
        console.log('call constructor');
        this.usable_min = "0";
        this.allRecords = call.initRecords();
        CallProvider.phoneNumberService = ''; //清除拨号
        this.http.httpMethodContext(HttpUrl.voiceTime, {}, function (res, context) {
            context.usable_min = Math.ceil(res.result / 60);
        }, this);
    }
    CallPage.prototype.ionViewDidLoad = function () {
        console.log('call ionViewDidLoad');
    };
    CallPage.prototype.calling = function (item) {
        this.call.callSomebody(item);
    };
    __decorate([
        ViewChild('btn-keyboard'), 
        __metadata('design:type', ElementRef)
    ], CallPage.prototype, "btnKeyboard", void 0);
    CallPage = __decorate([
        Component({
            selector: 'page-call',
            templateUrl: 'call.html'
        }), 
        __metadata('design:paramtypes', [NavController, PopoverController, CallProvider, HttpGet])
    ], CallPage);
    return CallPage;
}());
//# sourceMappingURL=call.js.map