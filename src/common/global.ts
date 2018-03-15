
import { Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { returnCitySN } from './returnCitySN';
import { HttpGet } from '../providers/http-get';
import { LoginPage } from '../pages/login/login';
import { GlobalProvider } from '../../providers/global-provider';
@Injectable()
export class Global {
	constructor(private jsonp: Jsonp, public http: HttpGet, ) {
		console.log('Global');
	}
}
export const globalVar = {
	isDevice: false,
    openHotPush: false,
	// isDevice: true,
    // openHotPush: true,
	hasLoadContacts: false,
	rushShow: true,
	isbubble: false,

	govoucher: false,
	location: { latitude: '', longitude: '', city: '', storename: '', storeaddr: '' },
	// location:{latitude:'22.54926',longitude:'113.9656',city:'深圳市'}
	Pard_grids: [{ id: "wanghong", img: "assets/img/icon_wanghongzhibo@2x.png", txt: "网红直播", showNum: 1001, isShow: false },
	{ id: "meinv", img: "assets/img/icon_meinvzhaopian@2x.png", txt: "美女图片", showNum: 1002, isShow: false },
	{ id: "youxi", img: "assets/img/icon_qingsongyouxi@2x.png", txt: "轻松游戏", showNum: 1003, isShow: false },
	{ id: "kaixin", img: "assets/img/icon_kaixinyike@2x.png", txt: "开心一刻", showNum: 1004, isShow: false }
	],
	unreadcount: 0,
	welcomeImgs: [],		//引导页图片
	version_name: '2.1.9.20171120',

};
export var HttpContents = {

	appos: '', //	App平台名称Android，ios
	ptype: '',
	device_id: '',
	device_version: '',
	brand_name: 'diancall/1.0',		//need config
	app_version: '',
	screen_resolution: screen.width * window.devicePixelRatio + "*" + screen.height * window.devicePixelRatio,
	app_agent: '',
	netmode: '',
	ip: '127.0.0.1',
}



// var config_app = "/config/app";
var url_redyouzi = "https://c.diancall.com";
var url_redyouzi_test = 'http://192.168.1.128:6001';

var urlHost = url_redyouzi;
// var urlHost = url_redyouzi_test;




// callback: urlHost +  call_back_new
export const HttpUrl = {
	getSmsregcode: urlHost + '/pipes/custuser/smsregcode/',
	getSmsChangecode: urlHost + "/pipes/custuser/smsmobcode/",
	register: urlHost + "/pipes/custuser/signup",
	login: urlHost + "/pipes/custuser/login",
	logout: urlHost + "/pipes/custuser/logout",
	callback: urlHost + "/pipes/custvoipcall/zexuntocall/",
	callbackCancel: urlHost + "/pipes/custvoipcall/canceltoback/",
	getToken: urlHost + "/pipes/custvoipcall/uctoken",
	getGoods: urlHost + "/pipes/charge/pkgs", //查询充值套餐列表
	getRechargeParams: urlHost + "/pipes/charge/prepay",
	checkRechargePay: urlHost + '/pipes/chargepay/check/',
	getConfigApp: urlHost + "/config/app",
	getRecharge: urlHost + "/order/pay",
	getUserWallet: urlHost + "/user/wallet",
	changeNickname: urlHost + '/pipes/custuser/updateusername',
	changePassword: urlHost + '/pipes/custuser/updatepwd',
	getResetPswCode: urlHost + '/pipes/custuser/smspwdcode',
	// resetPassword: urlHost + '/pipes/custuser/updatepwd',
	appInstallCount: urlHost + '/pipes/appinstall/create',
	checkin: urlHost + '/pipes/custuser/checkin',

	//add
	// trafficCharge: urlHost + '/pipes/nwcharge/pkgs/',
	trafficCharge: urlHost + '/pipes/custexper/experthing/fluxs',
	exchangePoints: urlHost + '/pipes/custexper/experthing/out/',
	updatePhone: urlHost + '/pipes/custuser/updatemobile',
	getOldSmsregcode: urlHost + '/pipes/custuser/smsodmcode',
	changePortrait: urlHost + '/pipes/upload/custuser',
	userbaseData: urlHost + '/pipes/custinfo/mybasedata',
	myTrafficCharge: urlHost + '/pipes/custexper/myexperthing/fluxs',
	myVoiceCharge: urlHost + '/pipes/custexper/myexperthing/voips',
	getOneExperthing: urlHost + '/pipes/custexper/experthing/find/',
	myExper: urlHost + '/pipes/custexper/myexper',
	experDetails: urlHost + '/pipes/custexper/queryin',
	experExchangeRecords: urlHost + '/pipes/custexper/queryout',
	voiceTime: urlHost + '/pipes/custvoipcall/myvoicetime',
	readMessages: urlHost + '/pipes/custmessage/queryreaded',
	unReadMessages: urlHost + '/pipes/custmessage/queryunread',
	hasReadMessages: urlHost + '/pipes/custmessage/read/',
	shopFamiliar: urlHost + '/pipes/custstore/mystores/familiar',
	shopNearby: urlHost + '/pipes/custstore/mystores/recently',
	searchShop: urlHost + '/pipes/custstore/searchstore',
	unfollowShop: urlHost + '/pipes/custstore/unfollow/',
	shopAllowPush: urlHost + '/pipes/custstore/unforbit/',
	shopForbitPush: urlHost + '/pipes/custstore/forbit/',
	followShop: urlHost + '/pipes/custstore/follow/',
	beautyPhotos: urlHost + '/pipes/custinfo/querygirl',
	queryNews: urlHost + '/pipes/custinfo/querynews',
	newsType: urlHost + '/pipes/custinfo/newstypes',
	firstNews: urlHost + '/pipes/custinfo/firstnews',
	queryjoke: urlHost + '/pipes/custinfo/queryjoke',
	gameTop: urlHost + '/pipes/custinfo/games/top',
	gameNew: urlHost + '/pipes/custinfo/games/new',
	gameHot: urlHost + '/pipes/custinfo/games/hot',
	guessLikeShop: urlHost + '/pipes/custstore/guesslikes',
	shopGoodsGroup: urlHost + '/pipes/custgoods/goodsgroup/',
	shopGoods: urlHost + '/pipes/custgoods/query/',
	aloneGoods: urlHost + '/pipes/custgoods/find/',
	arroundShops: urlHost + '/pipes/custstore/recentlystore',
	myFlows: urlHost + '/pipes/custflux/querycost',
	privilege: urlHost + '/pipes/custquan/query/',
	retroaction: urlHost + '/pipes/custuser/feedback',
	parkGrid: urlHost + '/pipes/custinfo/edenList',
	addCards: urlHost + '/pipes/custcard/usecard',
	// quanList: urlHost + '/pipes/custcard/query',//custpromotion/query
	quanList: urlHost + '/pipes/custpromotion/query',
	ceshi: urlHost + '/pipes/custpromotion/query',
	version: urlHost + '/pipes/appversion/query',

	findCar: urlHost + '/pipes/custcard/find/',
	smsRegisterCode: urlHost + '/pipes/custuser/smscodepost/',
	smsRegister: urlHost + '/pipes/custuser/smscodelogin',
	fenxiangrenwu: urlHost + '/pipes/share/createsharetask',
	fluxPool: urlHost + '/pipes/custflux/findfluxpool/',
	flowsData: urlHost + '/pipes/custflux/querycost',
	fluxPackge: urlHost + '/pipes/custflux/queryfluxpackage',
	payFlux: urlHost + '/pipes/custflux/payflux',
	updateFluxPool: urlHost + '/pipes/custflux/updatefluxpool',
	// getBanners: urlHost + '/app/frontcore/banner/banner_name_arr.txt',
	getBanners: urlHost + '/pipes/bannerpage/query',

	unReadMsgCount: urlHost + '/pipes/custmessage/unreadcount',
	huoqurenwu: urlHost + '/pipes/share/findshareaward/',
	oneShopInfo: urlHost + '/pipes/custstore/findstoreinfo/', // /pipes/share/findstoreinfo/ 
	querygoodsrush: urlHost + '/pipes/custrush/querygoodsrush',//抢购信息列表
	findgoodsrush: urlHost + '/pipes/custrush/findgoodsrush/',//,	查询抢购信息详情
	rushgoods: urlHost + '/pipes/custrush/rush',//	商品抢购
	jobList: urlHost + '/pipes/custjob/query',
	jonbDetails: urlHost + '/pipes/custjob/find',
	welcomeImgs: urlHost + '/pipes/startpage/query',
	validcodeImg: urlHost + '/pipes/validcode/get/',
	rushindex: urlHost + '/pipes/rush/querygoodsrushindex',//首页限时
	cdaward: urlHost + '/pipes/cdraward/query',//抽奖
	pointerDdaward: urlHost + '/pipes/cdraward/cdr',//抽奖
	qiandao: urlHost + '/pipes/custuser/checkin',//签到
	mycheckinfo: urlHost + '/pipes/custuser/mycheckinfo',//抢到状态
	giftList: urlHost + '/pipes/checkaward/query',//签到奖品列表
	shipAddr: urlHost + '/pipes/custshipadder/query',//查询用户收货地址列表
	add2custcart: urlHost + '/pipes/b2cmall/add2custcart',//商品添加购物车
	mycustcart: urlHost + '/pipes/b2cmall/mycustcart',//查询我的购物车
	deletecustcart: urlHost + '/pipes/b2cmall/deletecustcart',//删除购物车商品
	querycategoty: urlHost + '/pipes/3km/querycategoty',//行业分类
	querygoods: urlHost + '/pipes/3km/querygoods',//查询商品
	goodsorder: urlHost + '/pipes/b2cmall/createcustgoodsorder',//生成订单
	myAddress: urlHost + '/pipes/custshipadder/update',//我的地址

	queryService: urlHost + '/pipes/merchservice/query', //查询商家提供的预约服务列表
	querygoodsorder: urlHost + '/pipes/b2cmall/querycustgoodsorder',//查询当前用户的订单列表
	confirmgoodsorder: urlHost + '/pipes/b2cmall/confirmgoodsorder/', //确认收货
	cancelgoodsorder: urlHost + '/pipes/b2cmall/cancelgoodsorder/',//取消订单
	reminder: urlHost + '/pipes/b2cmall/reminder/',//催单
	mycdrcount: urlHost + '/pipes/cdraward/mycdrcount',//抽奖次数
	prepay: urlHost + '/pipes/b2cpay/prepay',//app支付
	bookservice: urlHost + '/pipes/b2cmall/bookservice',//预约服务下单
	sin_recently: urlHost + '/pipes/share/custshare/recently',//分享赠送
	custmerchdelivery: urlHost + '/pipes/custmerchdelivery/find/',

	recharge: urlHost + '/pipes/cdraward/recharge',
	guessLike: urlHost + '/pipes/custgoods/guess',    //猜你喜欢
	notification: urlHost +'/pipes/notification/query',	//通知信息

	// fixorderinfo: urlHost + '/pipes/b2cmall/updategoodsorder/shippingaddress',//订单修改
	confirmorder: urlHost + '/pipes/b2cmall/updategoodsorder/confirmorder', //修改订单确认
	searchpacket: urlHost + '/pipes/b2cmall/querydiscount/', // 查询红包优惠
	findaddress: urlHost + '/pipes/custshipadder/find/', // 根据地质id查询地质
	custcdhis: urlHost + '/pipes/custcdhis/check/',
}
export var showToast = function (msg) {
	if (globalVar.isDevice) {
		(<any>window).plugins.toast.showShortCenter(msg);
	}
}
/**
 * 设备信息
 */
var initDeviceInfo = function () {
	let device = (<any>window).device;
	let cordova = (<any>window).cordova;

	console.log('device.platform==' + device.platform);

	HttpContents.appos = device.platform;

	HttpContents.device_id = device.uuid;
	HttpContents.ptype = device.manufacturer + ' ' + device.model;
	HttpContents.device_version = device.version;
	cordova.getAppVersion.getVersionNumber(function (version) {
		// alert(version);
		HttpContents.app_version = version;
		HttpContents.app_agent = HttpContents.brand_name + '/' + HttpContents.app_version + '; ' +
			HttpContents.appos + '/' + HttpContents.device_version + '; ' +
			device.manufacturer + '/' + device.model + '; ' + HttpContents.screen_resolution;
		console.log('app_agent==' + HttpContents.app_agent);
	});
	// console.log('device_version=' + HttpContents.device_version);
	// console.log('device.manufacturer==' + device.manufacturer);
	// console.log('device.model==' + device.model);
	//	console.log('width==' + screen.width * window.devicePixelRatio + '  height==' + screen.height * window.devicePixelRatio);
}
/*
 * 获取网络状态
 */
var getNetWorkState = function () {
	let navigator = (<any>window).navigator;
	let networkState = navigator.connection.type;
	let Connection = (<any>window).Connection;
	//wifi、3g、4g、gprs
	var states = {};
	states[Connection.UNKNOWN] = 'gprs';
	states[Connection.ETHERNET] = 'gprs';
	states[Connection.WIFI] = 'wifi';
	states[Connection.CELL_2G] = 'gprs';
	states[Connection.CELL_3G] = '3g';
	states[Connection.CELL_4G] = '4g';
	states[Connection.CELL] = 'Cell generic connection';
	// states[Connection.NONE]     = 'No network connection'; 
	if (networkState === Connection.NONE) {
		showToast("网络断开！");
		return;
	}

	HttpContents.netmode = states[networkState];
}

/**
 * 初始化
 */
export var initNative = function () {
	initDeviceInfo();
	getNetWorkState();

}
export var initData = function () {
	//默认拨打方式
	if (localStorage.getItem('call_type') == null) {
		localStorage.setItem('call_type', 'call_back');
	}
	HttpContents.ip = (<any>window).returnCitySN["cip"];
}



export const constVar = {
	portrait_server_path: 'http://c.diancall.com/dir/custuser_128/',
	storefaceurl_300: 'http://c.diancall.com/dir/storeface_300/',
	storefaceurl_900: 'http://c.diancall.com/dir/storeface_900/',
	goodsfaceurl_300: 'http://c.diancall.com/pipes/img/goods_300/',
	goodsfaceurl_900: 'http://c.diancall.com/pipes/img/goods_900/',
	storeimgsurl_720: 'http://c.diancall.com/dir/storeimg_720/',
	qrcode: 'http://c.diancall.com/app/cdl/custuser36id:',
	giftImg:'http://c.diancall.com/dir/cdraward/',
	// banner_url: 'http://c.diancall.com/app/frontcore/banner/',
	banner_url: urlHost + '/dir/custbanner/',

	welcome_url: urlHost + '/dir/startpage58/',
	register_url: 'http://merch.diancall.com/modules/share/shareLogin/shareLogin.html',
}

export var saveLoginInfo = function (res) {
	localStorage.setItem("custuserid", res.result.custuserid);
	localStorage.setItem("custuser36id", res.result.custuser36id);

	console.log('custuserid==' + res.result.custuserid);
	console.log('custuser36id==' + res.result.custuser36id);

	// localStorage.setItem("mobilex", res.result.mobilex);
	// localStorage.setItem("custuser36id", res.result.custuser36id);
	// localStorage.setItem("custuserid", res.result.custuserid);

	// localStorage.setItem("uid", res.result.brand36id);

}
export var loadScript = function (url, callback) {
	let script: any = document.createElement("script");
	script.type = "text/javascript";
	if (typeof (callback) != "undefined") {
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function () {
				callback();
			};
		}
	}
	script.src = url;
	document.body.appendChild(script);
}

export var code2Html = function (str: string) {
	let arrEntities = { 'nbsp': ' ' };
	str = str.replace(/&(nbsp);/ig, function (all, t) { return arrEntities[t] }).replace(/\r?\n/g, "<br />");
	return str;
}
/*
* 是否登录
*/
export var isLogin = function (): boolean {
	console.log('isLogin');
	console.log('极光推送')
	let custuserid = localStorage.getItem('custuserid');
	if (custuserid == null || custuserid === 'undefined') {
		console.log('未登录');
		return false;
	} else {
		console.log('已经登录：' + custuserid);
		
		return true;
	}
}
/*
*
*登录超时
*/
// if (res.json().retcode == 30020001) {
//   showToast('登录超时');
//   console.log('登录超时');
//   context.navCtrl.push(LoginPage, { 'later': true });

// } else {
//   onSuccess(res.json(), context);
// }
/*
* 去登录
*/
export var goLogin = function (context, later?: boolean): boolean {
	console.log('isLogin');
	let custuserid = localStorage.getItem('custuserid');
	if (custuserid == null || custuserid === 'undefined') {
		console.log('未登录');
		context.navCtrl.push(LoginPage, { 'later': later });
		return false;
	} else {
		console.log('已经登录：' + custuserid);
		return true;
	}
}
export var initFunction = function () {
	(String as any).prototype.replaceAll = function (s1, s2) {
		return this.replace(new RegExp(s1, 'gm'), s2);
	};
	(Date as any).prototype.format = function (format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1
					? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}

}

/**
 * 发送验证码按钮倒计时
 */
export var changeCodeBtn = function (context) {
	context.code_css = 'btnVerifyInable';
	context.code_disable = true;
	let cont = 59;
	let interval = setInterval(() => {
		context.code_txt = cont + '秒';
		cont--;
		if (cont == 0) {
			context.code_css = 'btnVerify';
			context.code_txt = '获取验证码';
			context.code_disable = false;
 		}
	}, 1000);
}



