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
import { CallProvider } from '../../providers/call-provider';
export var KeyboardPage = (function () {
    function KeyboardPage(navCtrl, navParams, call) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.call = call;
        this.phone_number = "";
        this.getNumber = function (number) {
            //		console.log("number == " + number);
            switch (number) {
                case "delete":
                    this.phone_number = this.phone_number.substring(0, this.phone_number.length - 1);
                    CallProvider.phoneNumberService = this.phone_number;
                    break;
                default:
                    {
                        if (typeof this.phone_number === 'undefined') {
                            this.phone_number = number;
                        }
                        else {
                            this.phone_number += number;
                            CallProvider.phoneNumberService = this.phone_number;
                        }
                    }
                    break;
            }
        };
    }
    KeyboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KeyboardPage');
    };
    KeyboardPage = __decorate([
        Component({
            selector: 'page-keyboard',
            templateUrl: 'keyboard.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, CallProvider])
    ], KeyboardPage);
    return KeyboardPage;
}());
//# sourceMappingURL=keyboard.js.map