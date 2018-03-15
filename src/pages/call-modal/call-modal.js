var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, NgModule } from '@angular/core';
import { NavController, NavParams, ViewController, Tabs, PopoverController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { CallPage } from '../call/call';
import { CallProvider } from '../../providers/call-provider';
import { CallSettingPage } from '../../pages/call-setting/call-setting';
export var CallModalPage = (function () {
    function CallModalPage(navCtrl, navParams, viewCtrl, popoverCtrl, call) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.popoverCtrl = popoverCtrl;
        this.call = call;
        this.callRoot = CallPage;
        this.contactRoot = ContactPage;
        console.log('CallModalPage');
        this.isKeyboardShow = true;
        this.contactShow = false;
        this.footer_keyboard = "assets/img/icon_bohao_sel@2x.png";
        this.footer_contact = "assets/img/icon_wode_nor@2x.png";
        this.setting_page = CallSettingPage;
        // this.popover = this.popoverCtrl.create(KeyboardPage,{},{cssClass:'keyboard-backdrop'});
    }
    CallModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CallModalPage');
    };
    CallModalPage.prototype.calling = function () {
        // let call : CallProvider = new CallProvider();
        console.log("calling==" + CallProvider.phoneNumberService);
        var contact = { phoneNumber: CallProvider.phoneNumberService, displayName: '' };
        //隐藏键盘
        this.isKeyboardShow = false;
        this.call.callSomebody(contact);
    };
    CallModalPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    CallModalPage.prototype.closeKeyboard = function () {
        // this.callPage.close();
    };
    CallModalPage.prototype.goCallPage = function (myEvent) {
        //控制tab
        if (this.contactShow) {
            console.log('contactShow');
            this.footer_keyboard = "assets/img/icon_bohao_sel@2x.png";
            this.footer_contact = "assets/img/icon_wode_nor@2x.png";
            this.contactShow = false;
            this.presentPopover(myEvent);
            this.isKeyboardShow = true;
        }
        else {
            console.log('contactShow not');
            //控制键盘
            if (this.isKeyboardShow) {
                console.log('isKeyboardShow');
                // this.popover.dismiss();
                this.isKeyboardShow = false;
            }
            else {
                console.log('isKeyboardShow not');
                this.presentPopover(myEvent);
                this.isKeyboardShow = true;
            }
        }
    };
    CallModalPage.prototype.presentPopover = function (myEvent) {
        // this.popover = this.popoverCtrl.create(KeyboardPage, {}, { cssClass: 'keyboard-backdrop' });
        // this.popover.present({
        //   ev: myEvent
        // });
    };
    CallModalPage.prototype.goContactsPage = function () {
        if (this.isKeyboardShow) {
            console.log('isKeyboardShow');
            // this.popover.dismiss();
            this.isKeyboardShow = false;
        }
        this.footer_contact = "assets/img/icon_wode_sel@2x.png";
        this.footer_keyboard = "assets/img/icon_bohao_nor@2x.png";
        this.contactShow = true;
        this.isKeyboardShow = false;
    };
    __decorate([
        ViewChild('callTabs'), 
        __metadata('design:type', Tabs)
    ], CallModalPage.prototype, "tabCall", void 0);
    __decorate([
        ViewChild(CallPage), 
        __metadata('design:type', CallPage)
    ], CallModalPage.prototype, "callPage", void 0);
    CallModalPage = __decorate([
        Component({
            selector: 'page-call-modal',
            templateUrl: 'call-modal.html',
        }),
        NgModule({}), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, PopoverController, CallProvider])
    ], CallModalPage);
    return CallModalPage;
}());
//# sourceMappingURL=call-modal.js.map