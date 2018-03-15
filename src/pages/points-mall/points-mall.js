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
import { HttpUrl } from '../../common/global';
import { PointsExchangePage } from '../PointsExchange/PointsExchange';
export var PointsMallPage = (function () {
    function PointsMallPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.is_tab1_active = true;
        this.telecomList = []; //电信总的数据
        this.telecomRaw = new Array(); //行号
        this.lastTelecomShow = false; //最后一行剩一个时，是否显示
        this.Unicom = {
            unicomList: [],
            unicomLast: 0,
            unicomRaw: [],
            lastUnicomShow: false
        };
        this.Mobile = {
            mobileList: [],
            mobileLast: 0,
            mobileRaw: [],
            lastMobileShow: false
        };
        this.Voice = {
            list: [],
            last: 0,
            raw: [],
            show: false
        };
        this.traffic_description = "国内流量";
        this.points_mall_title_img = "assets/img/jfdh_bg_banner@2x.png";
        this.points_type = "china_telecom";
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.tab3_class = "text-off";
        this.context = this;
    }
    PointsMallPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointsMallPage');
        this.http.httpMethodContext(HttpUrl.trafficCharge, {}, this.getTrafficChargeOnSuccess, this.context);
    };
    PointsMallPage.prototype.getTrafficChargeOnSuccess = function (res, context) {
        console.log("获取流量套餐成功！");
        res = { "rows": [{ "createtime": 1484033137986, "display": 1000, "experthing36id": "7pt", "experthingid": 10001, "sellexper": 5000, "status": 10, "subtitle": "国内流量", "subtype": 8, "title": "电信1G定向流量", "type": 10, "value": 1048576 }, { "createtime": 1484033173676, "display": 1000, "experthing36id": "7pu", "experthingid": 10002, "sellexper": 9000, "status": 10, "subtitle": "国内流量", "subtype": 8, "title": "电信2G定向流量", "type": 10, "value": 2097152 }, { "createtime": 1484033186316, "display": 1000, "experthing36id": "7pv", "experthingid": 10003, "sellexper": 17500, "status": 10, "subtitle": "国内流量", "subtype": 8, "title": "电信4G定向流量", "type": 10, "value": 4194304 }, { "createtime": 1484033205653, "display": 1000, "experthing36id": "7pw", "experthingid": 10004, "sellexper": 32000, "status": 10, "subtitle": "国内流量", "subtype": 8, "title": "电信8G定向流量", "type": 10, "value": 8388608 }, { "createtime": 1484033137986, "display": 1000, "experthing36id": "7pt", "experthingid": 10001, "sellexper": 5000, "status": 10, "subtitle": "国内流量", "subtype": 8, "title": "电信1G定向流量", "type": 20, "value": 1048576 }], "total": 4 };
        //区分流量or语音
        var flows_arr = [];
        for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type === 10) {
                //流量
                flows_arr.push(item);
            }
            else {
                //语音
                context.Voice.list.push(item);
            }
        }
        //区分流量运营商
        for (var _b = 0, flows_arr_1 = flows_arr; _b < flows_arr_1.length; _b++) {
            var item = flows_arr_1[_b];
            switch (item.subtype) {
                case 8:
                    context.telecomList.push(item);
                    break;
                case 4:
                    context.Unicom.unicomList.push(item);
                    break;
                case 2:
                    context.Mobile.mobileList.push(item);
                    break;
                default:
                    break;
            }
        }
        context.formatFlowsData();
        context.formatVoiceData();
    };
    PointsMallPage.prototype.formatVoiceData = function () {
        var res = this.Voice.list;
        this.Voice.last = res.length - 1;
        if (res.length % 2 != 0) {
            this.Voice.show = true;
            this.Voice.raw.length = Math.floor(res.length / 2);
        }
        else {
            this.Voice.show = false;
            this.Voice.raw.length = res.length / 2;
        }
        for (var i = 0; i < this.Voice.raw.length; i++) {
            this.Voice.raw[i] = i;
        }
    };
    PointsMallPage.prototype.formatFlowsData = function () {
        for (var i = 0; i < 3; i++) {
            //电信
            if (i === 0) {
                var res = this.telecomList;
                this.telecomLast = res.length - 1;
                if (res.length % 2 != 0) {
                    this.lastTelecomShow = true;
                    this.telecomRaw.length = Math.floor(res.length / 2);
                }
                else {
                    this.lastTelecomShow = false;
                    this.telecomRaw.length = res.length / 2;
                }
                for (var i_1 = 0; i_1 < this.telecomRaw.length; i_1++) {
                    this.telecomRaw[i_1] = i_1;
                }
            }
            //联通
            if (i === 1) {
                var res = this.Unicom.unicomList;
                this.Unicom.unicomLast = res.length - 1;
                if (res.length % 2 != 0) {
                    this.Unicom.lastUnicomShow = true;
                    this.Unicom.unicomRaw.length = Math.floor(res.length / 2);
                }
                else {
                    this.Unicom.lastUnicomShow = false;
                    this.Unicom.unicomRaw.length = res.length / 2;
                }
                for (var i_2 = 0; i_2 < this.Unicom.unicomRaw.length; i_2++) {
                    this.Unicom.unicomRaw[i_2] = i_2;
                }
            }
            //移动
            if (i === 2) {
                var res = this.Mobile.mobileList;
                this.Mobile.mobileLast = res.length - 1;
                if (res.length % 2 != 0) {
                    this.Mobile.lastMobileShow = true;
                    this.Mobile.mobileRaw.length = Math.floor(res.length / 2);
                }
                else {
                    this.Mobile.lastMobileShow = false;
                    this.Mobile.mobileRaw.length = res.length / 2;
                }
                for (var i_3 = 0; i_3 < this.Mobile.mobileRaw.length; i_3++) {
                    this.Mobile.mobileRaw[i_3] = i_3;
                }
            }
        }
    };
    // formatAsRaw2(res) {
    //   let arr = [];
    //   let n = 0;
    //   for (let i = 0; i < res.length; i++) {
    //     // if(n<2){
    //     //   obj["item"+n] = 
    //     // }
    //   }
    //   return arr;
    // }
    PointsMallPage.prototype.selectedChinaTelecom = function () {
        console.log('selectedChinaTelecom');
        this.points_type = "china_telecom";
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.tab3_class = "text-off";
    };
    PointsMallPage.prototype.selectedChinaUnicom = function () {
        console.log('selectedChinaUnicom');
        this.points_type = "china_unicom";
        this.tab1_class = "text-off";
        this.tab2_class = "text-actived";
        this.tab3_class = "text-off";
    };
    PointsMallPage.prototype.selectedChinaMobile = function () {
        console.log('selectedChinaMobile');
        this.points_type = "china_mobile";
        this.tab1_class = "text-off";
        this.tab2_class = "text-off";
        this.tab3_class = "text-actived";
    };
    PointsMallPage.prototype.active = function () {
        return this.is_tab1_active;
    };
    PointsMallPage.prototype.pointsExchange = function (id) {
        this.navCtrl.push(PointsExchangePage, { goods_id: id });
    };
    PointsMallPage = __decorate([
        Component({
            selector: 'page-points-mall',
            templateUrl: 'points-mall.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, HttpGet])
    ], PointsMallPage);
    return PointsMallPage;
}());
//# sourceMappingURL=points-mall.js.map