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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ChangePhonePage } from '../change-phone/change-phone';
import { ChangePasswordPage } from '../change-password/change-password';
import { SuggestionsPage } from '../suggestions/suggestions';
import { AboutDianCallPage } from '../about-dian-call/about-dian-call';
import { HttpUrl, showToast } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { TabsPage } from '../tabs/tabs';
export var SettingPage = (function () {
    function SettingPage(navCtrl, navParams, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.customer_service_number = '0755-8666-5265';
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingPage');
    };
    SettingPage.prototype.goNextPage = function (type) {
        var nextPage;
        switch (type) {
            case 'changePhone':
                nextPage = ChangePhonePage;
                break;
            case 'changeParssword':
                nextPage = ChangePasswordPage;
                break;
            case 'suggestions':
                nextPage = SuggestionsPage;
                break;
            case 'aboutDianCall':
                nextPage = AboutDianCallPage;
                break;
            default:
                break;
        }
        this.navCtrl.push(nextPage);
    };
    SettingPage.prototype.clearCache = function () {
        var confirm = this.alertCtrl.create({
            title: '缓存',
            message: '是否清除缓存?',
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        console.log('agree clicked');
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    SettingPage.prototype.logout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '确定退出登录？',
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        _this.http.httpMethod(HttpUrl.logout, {}, function () {
                            localStorage.removeItem('custuserid');
                            localStorage.removeItem('loginToken');
                            localStorage.removeItem('custuser36id');
                            _this.navCtrl.push(TabsPage);
                            showToast("退出登录成功！");
                            console.log('退出登录成功！');
                        });
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    SettingPage = __decorate([
        Component({
            selector: 'page-setting',
            templateUrl: 'setting.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, AlertController, HttpGet])
    ], SettingPage);
    return SettingPage;
}());
//# sourceMappingURL=setting.js.map