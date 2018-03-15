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
export var MessagesPage = (function () {
    function MessagesPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.readList = [];
        this.unReadList = [];
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.msg_type = 'unreadMsg';
    }
    MessagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagesPage');
        this.getReadMsg();
        this.getUnReadMsg();
    };
    MessagesPage.prototype.getReadMsg = function () {
        var dataParams = {
            flipper: {
                limit: 10,
                offset: 10,
            }
        };
        this.http.httpMethodContext(HttpUrl.readMessages, dataParams, function (res, context) {
            context.readList = res.rows;
        }, this);
    };
    MessagesPage.prototype.getUnReadMsg = function () {
        var dataParams = {
            flipper: {
                limit: 10,
                offset: 10,
            }
        };
        this.http.httpMethodContext(HttpUrl.unReadMessages, dataParams, function (res, context) {
            context.unReadList = res.rows;
        }, this);
    };
    MessagesPage.prototype.selectedUnread = function () {
        this.msg_type = 'unreadMsg';
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
    };
    MessagesPage.prototype.selectedRead = function () {
        this.msg_type = 'readMsg';
        this.tab1_class = "text-off";
        this.tab2_class = "text-actived";
    };
    MessagesPage.prototype.toRead = function () {
        var url = HttpUrl.hasReadMessages + ""; //加id
        this.http.httpMethodContext(url, {}, function (res, context) {
        }, this);
    };
    MessagesPage = __decorate([
        Component({
            selector: 'page-messages',
            templateUrl: 'messages.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], MessagesPage);
    return MessagesPage;
}());
//# sourceMappingURL=messages.js.map