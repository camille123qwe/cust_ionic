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
import { HttpUrl, showToast, saveLoginInfo } from '../../common/global';
import { md5 } from '../../common/md5';
export var ForgetPasswordPage = (function () {
    function ForgetPasswordPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ForgetPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPasswordPage');
    };
    ForgetPasswordPage.prototype.getOldCode = function (phone) {
        var dataParams = {
            mobile: phone
        };
        this.http.httpMethod(HttpUrl.getResetPswCode, dataParams, function (res) {
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
    ForgetPasswordPage.prototype.submmit = function (phone, code, new_psw, confirm_psw) {
        if (new_psw == confirm_psw) {
            var dataParams = {
                bean: {
                    vercode: code,
                    newpwd: md5(new_psw),
                    account: phone
                }
            };
            this.http.httpMethodContext(HttpUrl.changePassword, dataParams, function (res, context) {
                // showToast(res.retinfo);
                if (res.retcode == 0) {
                    showToast("密码修改成功！");
                    console.log("密码修改成功！");
                    saveLoginInfo(res);
                    context.navCtrl.popToRoot();
                }
                else {
                    alert(res.retinfo);
                }
            }, this);
        }
    };
    ForgetPasswordPage = __decorate([
        Component({
            selector: 'page-forget-password',
            templateUrl: 'forget-password.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], ForgetPasswordPage);
    return ForgetPasswordPage;
}());
//# sourceMappingURL=forget-password.js.map