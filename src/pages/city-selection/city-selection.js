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
import { NavController, ViewController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { loadScript } from '../../common/global';
// import { $ } from 'zepto';
export var CitySelectionPage = (function () {
    function CitySelectionPage(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.myInput = '';
        var that = this;
        loadScript("http://zeptojs.com/zepto.min.js", function () {
            that.indexOnClick();
        });
    }
    CitySelectionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CitySelectionPage');
    };
    CitySelectionPage.prototype.onSearchInput = function (event) {
    };
    CitySelectionPage.prototype.indexOnClick = function () {
        var $ = window.$;
        var context = this;
        //选择城市 start
        $('body').on('click', '.city-list p', function () {
            var type = $('.container').data('type');
            $('#zone_ids').html($(this).html()).attr('data-id', $(this).attr('data-id'));
            $('#gr_zone_ids').html($(this).html()).attr('data-id', $(this).attr('data-id'));
            console.log("html::" + $(this).html());
            console.log("data-id::" + $(this).attr('data-id'));
            context.close($(this).html());
        });
        //侧边栏索引
        $('body').on('click', '.letter a', function () {
            var s = $(this).html();
            var yOffset = document.getElementById(s + '1').offsetTop;
            context.content.scrollTo(0, yOffset + 350, 200);
        });
    };
    CitySelectionPage.prototype.close = function (city) {
        this.viewCtrl.dismiss({ 'select_city': city });
    };
    CitySelectionPage.prototype.selectNormal = function (event) {
        var target = event.target || event.srcElement;
        this.close(target.innerHTML);
    };
    __decorate([
        ViewChild(Content), 
        __metadata('design:type', Content)
    ], CitySelectionPage.prototype, "content", void 0);
    CitySelectionPage = __decorate([
        Component({
            selector: 'page-city-selection',
            templateUrl: 'city-selection.html'
        }), 
        __metadata('design:paramtypes', [NavController, ViewController])
    ], CitySelectionPage);
    return CitySelectionPage;
}());
//# sourceMappingURL=city-selection.js.map