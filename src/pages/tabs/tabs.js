var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FindPage } from '../find/find';
import { LoginPage } from '../login/login';
import { CallModalPage } from '../call-modal/call-modal';
import { MePage } from '../me/me';
import { ParkPage } from '../park/park';
export var TabsPage = (function () {
    function TabsPage(navCtrl, navParams, modalCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.tab1Root = HomePage;
        this.tab2Root = ParkPage;
        this.tab3Root = MePage;
        this.tab4Root = FindPage;
        console.log(' TabsPage constructor()');
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TabsPage');
        // this.navCtrl.push(CitySelectionPage);
    };
    TabsPage.prototype.ionViewWillEnter = function () {
        console.log(' TabsPage ionViewWillEnter()');
    };
    TabsPage.prototype.call = function () {
        if (this.isLogin()) {
            var modal = this.modalCtrl.create(CallModalPage);
            modal.present();
        }
    };
    TabsPage.prototype.goMePage = function () {
        this.isLogin();
    };
    /*
  * 是否登录
  */
    TabsPage.prototype.isLogin = function () {
        console.log('isLogin');
        var custuserid = localStorage.getItem('custuserid');
        if (custuserid == null || custuserid === 'undefined') {
            console.log('未登录');
            this.navCtrl.push(LoginPage, {});
            return false;
        }
        else {
            console.log('已经登录：' + custuserid);
            /*		if(null == localStorage.getItem('callType')) {
                  console.log("默认直拨");
                  localStorage.setItem('callType', 'callDirect');
                }*/
            //连接云之讯
            // connectYZX();
            return true;
        }
    };
    __decorate([
        ViewChild('homeTabs'), 
        __metadata('design:type', Tabs)
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ModalController, ViewController])
    ], TabsPage);
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map