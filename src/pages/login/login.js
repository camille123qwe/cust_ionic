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
import { RegisterPage } from '../register/register';
import { md5 } from '../../common/md5';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, saveLoginInfo } from '../../common/global';
import { ConnectYZX } from '../../providers/connect-yzx';
import { ForgetPasswordPage } from '../forget-password/forget-password';
export var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, http, connect) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.connect = connect;
        this.logoSrc = "assets/img/login_imge.png";
        this.context = this;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.goForgetPassword = function () {
        this.navCtrl.push(ForgetPasswordPage, {});
    };
    LoginPage.prototype.goRegisterPage = function () {
        this.navCtrl.push(RegisterPage, {});
    };
    LoginPage.prototype.onSuccess = function (res, context) {
        if (res.retcode == 0) {
            saveLoginInfo(res);
            showToast("登录成功！");
            console.log("登录成功！");
            context.navCtrl.pop();
            context.connect.connectYZX();
        }
        else {
            alert(res.retinfo);
        }
    };
    LoginPage.prototype.onLogin = function (phone, password) {
        var dataParams = {
            "bean": {
                "account": phone,
                "password": md5(password),
                "apptoken": HttpContents.device_id,
                // "cacheday": 登录信息缓存天数， APP默认值： 1000,
                "netmode": HttpContents.netmode,
                "appversion": HttpContents.app_version,
                "appos": HttpContents.appos + '/' + HttpContents.device_version
            }
        };
        this.http.httpMethodContext(HttpUrl.login, dataParams, this.onSuccess, this.context);
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet, ConnectYZX])
    ], LoginPage);
    return LoginPage;
}());
//# sourceMappingURL=login.js.map