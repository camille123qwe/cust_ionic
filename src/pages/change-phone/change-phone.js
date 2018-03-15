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
import { HttpUrl, showToast } from '../../common/global';
export var ChangePhonePage = (function () {
    function ChangePhonePage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ChangePhonePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePhonePage');
    };
    ChangePhonePage.prototype.getOldCode = function () {
        this.http.httpMethod(HttpUrl.getOldSmsregcode, {}, function (res) {
            // showToast(res.retinfo);
            if (res.retcode == 0) {
                showToast("短信发送成功！");
                console.log("短信发送成功！");
            }
            else {
                alert(res.retinfo);
            }
        });
    };
    ChangePhonePage.prototype.getNewCode = function (new_phone) {
        var url = HttpUrl.getSmsChangecode + "mobile:" + new_phone;
        this.http.httpMethod(url, {}, function (res) {
            // showToast(res.retinfo);
            if (res.retcode == 0) {
                showToast("短信发送成功！");
                console.log("短信发送成功！");
            }
            else {
                alert(res.retinfo);
            }
        });
    };
    ChangePhonePage.prototype.submmit = function (old_code, new_phone, new_code) {
        var dataParams = {
            precode: old_code,
            vercode: new_code,
            mobile: new_phone
        };
        this.http.httpMethodContext(HttpUrl.updatePhone, dataParams, function (res, context) {
            // showToast(res.retinfo);
            if (res.retcode == 0) {
                showToast("手机号码修改成功！");
                console.log("手机号码修改成功！");
                context.navCtrl.pop();
            }
            else {
                alert(res.retinfo);
            }
        }, this);
    };
    ChangePhonePage = __decorate([
        Component({
            selector: 'page-change-phone',
            templateUrl: 'change-phone.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], ChangePhonePage);
    return ChangePhonePage;
}());
//# sourceMappingURL=change-phone.js.map