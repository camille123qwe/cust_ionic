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
import { NavController } from 'ionic-angular';
import { pinyin } from '../../common/pinyin';
import { Location } from '@angular/common';
import { globalVar } from '../../common/global';
import { Contacts, ContactFindOptions, Device } from 'ionic-native';
import { CallProvider } from '../../providers/call-provider';
export var ContactPage = (function () {
    function ContactPage(navCtrl, location, mCallProvidre) {
        this.navCtrl = navCtrl;
        this.mCallProvidre = mCallProvidre;
        this.formatContacts = [];
        this.onSuccess = function (contacts) {
            console.log("getAllContacts onSuccess");
            console.log('Found contacts length==' + contacts.length);
            console.log('all contacts==' + JSON.stringify(contacts));
            var contactsLength = contacts.length;
            //显示的名称，Android ios不同
            var isAndroid = true;
            if (Device.platform != 'Android') {
                console.log('is IOS');
                isAndroid = false;
            }
            for (var i = 0; i < contactsLength; i++) {
                // console.log('obj for '+i);
                var obj = {
                    displayName: '',
                    phoneNumber: '',
                    pinyinName: ''
                };
                if (isAndroid) {
                    obj.displayName = contacts[i]._objectInstance.displayName;
                }
                else {
                    obj.displayName = contacts[i]._objectInstance.name.familyName;
                }
                obj.phoneNumber = contacts[i]._objectInstance.phoneNumbers[0].value;
                obj.pinyinName = pinyin.getFullChars(obj.displayName);
                var camelChar = pinyin.getCamelChars(obj.displayName).substring(0, 1);
                var j = 0;
                var len = this.formatContacts.length;
                for (j; j < len; j++) {
                    // console.log("ffff");
                    if (this.formatContacts[j].key == camelChar) {
                        this.formatContacts[j].value.push(obj);
                        break;
                    }
                }
                if (j == len) {
                    // console.log('新增key');
                    var arr = new Array();
                    arr.push(obj);
                    this.formatContacts[len] = {
                        key: camelChar,
                        value: arr
                    };
                }
                // console.log('obj format==' + JSON.stringify(obj));
                obj = null;
            }
            console.log('contacts objs format==' + JSON.stringify(this.formatContacts));
            CallProvider.formatContacts = this.formatContacts;
            // localStorage.setItem('local_contacts', this.formatContacts.toString());
            globalVar.hasLoadContacts = true;
        };
        this.location = location;
        this.searchInput = "";
        if (!globalVar.hasLoadContacts) {
            this.getAllContacts();
        }
        else {
            this.formatContacts = CallProvider.formatContacts;
            console.log('CallProvider.formatContacts==' + CallProvider.formatContacts);
        }
    }
    ContactPage.prototype.goWhere = function (loc) {
        console.log('loc==' + loc);
        this.location.go(loc);
        // $location.hash(loc);
        // $anchorScroll();
    };
    ContactPage.prototype.searchByKeyword = function (event) {
        console.log('input value=' + this.searchInput);
        var camel = pinyin.getCamelChars(this.searchInput).substring(0, 1);
        console.log("camel==" + camel);
        this.goWhere('contact-' + camel);
    };
    ContactPage.prototype.calling = function (item) {
        this.mCallProvidre.callSomebody(item);
    };
    /*
   * 获取联系人
   */
    ContactPage.prototype.getAllContacts = function () {
        var _this = this;
        console.log('getAllContacts');
        if (this.formatContacts.length === 0) {
            var options = new ContactFindOptions();
            var fields = void 0;
            fields = ["displayName", "phoneNumbers"];
            options.filter = "";
            options.multiple = true;
            options.hasPhoneNumber = true;
            Contacts.find(fields, options).then(function (result) {
                _this.onSuccess(result);
            });
        }
        // let arr = [{ "_objectInstance": { "id": "1", "rawId": null, "displayName": "李宁", "name": { "givenName": "李宁", "formatted": "李宁 " }, "nickname": null, "phoneNumbers": [{ "id": "1", "pref": false, "value": "158 1555 6666", "type": "mobile" }, { "id": "2", "pref": false, "value": "23 6665 8966", "type": "mobile" }], "emails": null, "addresses": null, "ims": null, "organizations": null, "birthday": null, "note": null, "photos": null, "categories": null, "urls": null }, "rawId": "1" }, { "_objectInstance": { "id": "2", "rawId": null, "displayName": "华为客服", "name": { "givenName": "华为客服", "formatted": "华为客服 " }, "nickname": null, "phoneNumbers": [{ "id": "6", "pref": false, "value": "4008308300", "type": "mobile" }], "emails": [{ "id": "7", "pref": false, "value": "mobile@huawei.com", "type": "home" }], "addresses": [{ "id": "8", "pref": false, "type": "work", "formatted": "深圳市龙岗区坂田华为基地", "streetAddress": "深圳市龙岗区坂田华为基地" }], "ims": null, "organizations": null, "birthday": null, "note": null, "photos": [{ "id": "5", "pref": false, "type": "url", "value": "content://com.android.contacts/contacts/2/photo" }], "categories": null, "urls": null }, "rawId": "2" }]
        //ios
        // {"_objectInstance":{"id":1,"rawId":null,"displayName":null,"name":{"givenName":null,"honorificSuffix":null,"formatted":"段誉","middleName":null,"familyName":"段誉","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"158-8943-3219","pref":false,"id":0,"type":"home"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null}
        // this.onSuccess(arr);
    };
    ContactPage = __decorate([
        Component({
            selector: 'page-contact',
            templateUrl: 'contact.html',
        }), 
        __metadata('design:paramtypes', [NavController, Location, CallProvider])
    ], ContactPage);
    return ContactPage;
}());
//# sourceMappingURL=contact.js.map