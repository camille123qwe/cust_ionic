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
import { NavController, NavParams, Content } from 'ionic-angular';
import { HttpUrl } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
export var BeautyPhotosPage = (function () {
    function BeautyPhotosPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.girls_type = 10;
        this.legs_list = [];
        this.pure_list = [];
        this.last_createtime = 0; //加載更多的時間戳
    }
    BeautyPhotosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BeautyPhotosPage');
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.type = 'left';
        this.getPhotos();
    };
    BeautyPhotosPage.prototype.getPhotos = function () {
        var dataParams = {
            bean: {
                type: this.girls_type,
                createtime: this.last_createtime
            },
            flipper: {}
        };
        this.http.httpMethodContext(HttpUrl.beautyPhotos, dataParams, this.onSuccess, this);
    };
    BeautyPhotosPage.prototype.onSuccess = function (res, context) {
        // {"rows":[{"bigimg":"https://hbimg.b0.upaiyun.com/a4744fffef206caa0658c73404c32b8a08f4b50c3882a-Ui1hrU_fw658","girlid":"a4744fffef206caa0658c73404c32b8a08f4b50c3882a-Ui1hrU","smallimg":"https://hbimg.b0.upaiyun.com/a4744fffef206caa0658c73404c32b8a08f4b50c3882a-Ui1hrU_fw320","type":10},
        // this.legs_list = res.rows;
        context.format(res.rows);
    };
    BeautyPhotosPage.prototype.format = function (rows) {
        if (this.girls_type == 10) {
            //长腿
            if (this.last_createtime === 0) {
                this.legs_list = rows;
            }
            else {
                for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                    var item = rows_1[_i];
                    this.legs_list.push(item);
                }
            }
        }
        else {
            //清纯
            if (this.last_createtime === 0) {
                this.pure_list = rows;
            }
            else {
                for (var _a = 0, rows_2 = rows; _a < rows_2.length; _a++) {
                    var item = rows_2[_a];
                    this.pure_list.push(item);
                }
            }
        }
        this.last_createtime = rows[rows.length - 1].createtime;
        console.log('last_createtime==' + this.last_createtime);
    };
    BeautyPhotosPage.prototype.selectedLeft = function () {
        this.type = 'left';
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.girls_type = 10;
        this.last_createtime = 0;
    };
    BeautyPhotosPage.prototype.selectedRight = function () {
        this.type = 'right';
        this.tab1_class = "text-off";
        this.tab2_class = "text-actived";
        this.girls_type = 20;
        this.getPhotos();
        this.content.scrollTo(0, 0, 200);
        this.last_createtime = 0;
    };
    BeautyPhotosPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            console.log('加载更多');
            _this.getPhotos();
            infiniteScroll.complete();
        }, 500);
    };
    __decorate([
        ViewChild(Content), 
        __metadata('design:type', Content)
    ], BeautyPhotosPage.prototype, "content", void 0);
    BeautyPhotosPage = __decorate([
        Component({
            selector: 'page-beauty-photos',
            templateUrl: 'beauty-photos.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], BeautyPhotosPage);
    return BeautyPhotosPage;
}());
//# sourceMappingURL=beauty-photos.js.map