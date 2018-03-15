import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, ModalController, Slides, ActionSheetController } from 'ionic-angular';
import { ShopSettingPage } from '../shop-setting/shop-setting';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import { LoginPage } from '../login/login';
import { ShopParticularsPage } from '../../pages/shop-particulars/shop-particulars';
import { GlobalProvider } from '../../providers/global-provider';
import { PreferentialModulePage } from '../../pages/preferential-module/preferential-module';
import { GoodsManagePage } from '../goods-manage/goods-manage';
import { SidePhotoPage } from '../../pages/side-photo/side-photo';


@Component({
  selector: 'page-shop-details',
  templateUrl: 'shop-details.html',
  // providers: [CallNumber],
})
export class ShopDetailsPage {
  title_banner = "";
  img_class: string = 'middle_img';
  setting_page;
  setting_params;
  followed;
  shopInfo;
  Storename;
  Storeface;
  shopYouhui;
  StoreID;
  infiniteScroll;
  StoreImg = [];
  flipper_page = 0;
  total = 0;
  status = [10];
  tel_str = '';
  call_mendian = true;
  FxIMg = 'assets/img/icon_fenxiang@2x.png';
  goods_list = [];
  pric = false;
  yhPrivilege = [];
  yhPrivilegelist = [];
  yhfirst = {};
  tho = false;
  tholist = true;
  moreShop = false;
  goodsface_300 = constVar.goodsfaceurl_300;
  goodsface_900 = constVar.goodsfaceurl_900;
  storefaceurl_300 = constVar.storefaceurl_300;
  storefaceurl_900 = constVar.storefaceurl_900;
  storeimgsurl_720 = constVar.storeimgsurl_720;
  limit = 20;
  Taskid;
  zengsong = true;
  fenxiangzengnsong = {};
  fenxiang1 = false;
  fenxiang2 = false;
  fenxiang3 = false;
  zengsongmoshi = true;
  cang = true;
  silderimg;
  isService = false;
  isDelivery = false;
  booklist = [];
  deliverylist = [];
  merchid = "";
  goActive='assets/img/jinpuIMg.png';
  banners = [{'flag':'active','src':'assets/img/jinpuIMg.png'},{'flag':'turn','src':'assets/img/lottery.png'},{'flag':'active','src':'assets/img/jinpuIMg.png'},{'flag':'turn','src':'assets/img/lottery.png'},{'flag':'active','src':'assets/img/jinpuIMg.png'},{'flag':'turn','src':'assets/img/lottery.png'},{'flag':'active','src':'assets/img/jinpuIMg.png'},{'flag':'turn','src':'assets/img/lottery.png'}];
  giftName = [];
  jihui = 100;
  // [{"city":"深圳市","createtime":1486536440817,"distance":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storename":"尚美酒店大冲测试点"},{"city":"深圳市","createtime":1486540997349,"distance":0,"goodsradio":53,"latitude":22.539,"longitude":113.929469,"merchid":30000002,"status":10,"store36id":"evu4i","storeaddr":"南山桃园路1号","storeface":"0m2cn2bfu5044ogumj1nql0b68.jpg","storeid":25000002,"storeimgs":"65b4ee97t7o0knu3102dl6o032.jpg;54pkqdchls3mqmt8ctff0bufor.jpg","storename":"尚美酒店桃园测试点"}]

  //从我的门店跳转而来
  // {"buycount":1000,"custstoreid":"3b2ozm-evu4h","custuserid":200000002,"followtime":1487143706688,"forbidtime":0,"pushtype":10,"saleuserid":0,"store":{"city":"深圳市","costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1486536440817,"custusercount":1,"distance":0,"goodscount":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"msmscount":0,"quancount":0,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storeman":"张生","storename":"尚美酒店大冲测试点"},"storeid":25000001,"weight":1000}

  constructor(public navCtrl: NavController, public globalProvider: GlobalProvider, public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams, private app: App, private http: HttpGet, public modalCtrl: ModalController, public cd: ChangeDetectorRef) {
    this.setting_page = ShopSettingPage;

    // if (!!this.navParams.get('isOpenInstall')) {
    //   console.log('isOpenInstall');
    //   this.getData();
    // } else {
    //   this.initData();
    //   this.showData();
    // }
    this.cdaward();
    this.initData();
  }
  maimaimai(item){
    event.stopPropagation();
    console.log(JSON.stringify(item))
    let data={
      'bean':{
        cartgoodsitemsid:'',//	String	【主键】 c端商城购物车id，类单品id,6位custuser36id-5位storeid-9位create36time
        custuserid:localStorage.getItem("custuserid"),//		long	c端用户id
        goodsid:item.goodsid,//		int	商品id
        count:2,//		int	件数
        storeid:item.storeid,//		int	商品关联门店id
        // status:'',//		short	状态: 10:正常;20:待审批;30：隐藏;40:下架;70:过期;80:删除;
        // props:''//	
      },'cols':'[""]'
       ,'props':[],
    }
    console.log(JSON.stringify(JSON.stringify(data)))
    this.http.httpMethodContext(HttpUrl.add2custcart,data, (res, context) => {

    },this)
  }
  // PreferentialModulePage,
  //   PrivilegeModaldulePage,
  //   CardSettingPage,
  getData() {
    console.log(JSON.stringify(this.navParams.data.store))
    this.http.httpMethodContext(HttpUrl.oneShopInfo + this.navParams.get('store36id'), {}, (res, context) => {
      res.followed = false;
      context.navParams.data = res;
      context.initData();
      context.showData();

    }, this);
  }

  //抽奖
  cdaward() {
    console.log(666)
    let data = {
      'bean': {
        status: [10]
      }
    }

    this.http.httpMethodContext(HttpUrl.cdaward, data, (res, context) => {
      context.giftName=[];
      console.log('奖品' + JSON.stringify(res));
      for (let item of res.rows) {

        context.giftName.push({'awardtitle':item.awardtitle,'awarddetail':item.awarddetail,'cdrawardid':item.cdrawardid});

      }
      console.log('xxx==' + JSON.stringify(context.giftName));
    }, this)
  }

  // 跳转活动页面
  active(item){
    console.log('flat:'+item.flag);
    if(item.flag == 'active'){
      this.navCtrl.push('ActivityPage')
    }else{
      // this.navCtrl.push('TurntablePage')
      this.navCtrl.push('TurntablePage', { 'gift': this.giftName, 'restcdrcount': this.jihui })
    }
    
  }
  initData() {

    if (this.navParams.data.followed) {
      console.log('从我的门店跳转而来');
      //从我的门店跳转而来
      this.shopInfo = this.navParams.data.store;
    } else {
      console.log('从首页跳转而来');
      this.shopInfo = this.navParams.data;
    }
    // console.log('this.shopInfo==' + JSON.stringify(this.shopInfo));

    if (this.shopInfo.isfollowed == 'true') {
      this.followed = true;
    } else {
      this.followed = false;
    }
    //营业时间
    if (typeof (this.shopInfo.opentime) == 'undefined') {
      this.shopInfo.opentime = '9:00';
    }
    if (typeof (this.shopInfo.closetime) == 'undefined') {
      this.shopInfo.closetime = '18:00';
    }
    // console.log('时间====='+this.shopInfo.opentime)
    this.title_banner = this.storefaceurl_900 + this.shopInfo.storeface;
    this.setting_params = { title: this.shopInfo.storename };

    if (typeof this.shopInfo.storetel == 'undefined' || this.shopInfo.storetel == 'null') {
      this.call_mendian = false;
      // this.shopInfo.storetel = '暂无';
    } else {
      this.tel_str = 'tel:' + this.shopInfo.storetel;
    }
  }
  // callSeller() {
  //   console.log('callSeller');
  //   this.callNumber.callNumber(this.shopInfo.storetel, true)
  //     .then(() => { console.log('拨打电话失败'); showToast('拨打电话失败') })
  //     .catch(() => { console.log('拨打电话失败'); showToast('拨打电话失败') });
  // }
  ifshow(item){
    if(typeof(item)=='undefined' || item==''){
      return false
    }else{
      return true;
    }
  }
  getGoods(id, infiniteScroll) {
    // {"rows":[{"createtime":1486540143814,"goods36id":"1njcht","goodsface":"0sbrdp5njm3p64f8nhql8ngetn.jpg","goodsid":100000001,"goodsname":"总统套房","goodsradio":53,"groupid":"evu4h.101","marketprice":3500,"merchid":30000002,"sellprice":3000,"status":10,"stocks":0,"storeid":25000001},{"createtime":1486543253196,"goods36id":"1njchu","goodsface":"1ck007sd9b4eork1dhjvmm43h9.jpg","goodsid":100000002,"goodsname":"双人豪华房","goodsradio":53,"groupid":"evu4h.101","marketprice":2000,"merchid":30000002,"sellprice":1500,"status":10,"stocks":0,"storeid":25000002}],"total":2}
    let data = {
      bean: {
        storeid: parseInt(id, 36),
        status: this.status,
      }, flipper: {
        offset: this.flipper_page,
        limit: this.limit
      }
    }
    // let url = HttpUrl.shopGoods + id;  //#	int	门店36ID    
    this.http.httpMethodContext(HttpUrl.shopGoods, data, (res, context) => {
      if (typeof (infiniteScroll) == undefined) {
        infiniteScroll.complete();
      }

      //  console.log('fffffffffffffff'+JSON.stringify(res.rows));
      this.total = res.total;
      for (let item of res.rows) {
        item.sellprice = item.sellprice / 100;
        item.marketprice = item.marketprice / 100;
        if (item.sellprice == '') {
          item.sellprice = '待定';
        } else if (item.sellprice == 0) {
          item.sellprice = '免费';
        }
        if (item.marketprice == 0 || item.marketprice == item.sellprice || item.marketprice < item.sellprice) {
          item.pric = true;
        } else {
          item.pric = false;
        }

      }

      //爆款置顶
      if (res.rows.length <= 5) {
        res.rows = res.rows;
        //  this.StoreID = res.rows[0].storeid.toString(36);
      } else {
        let resoult = [];
        for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].isrecommend != 0) {
            resoult.push(res.rows[i]);
            // resoult=res.rows.splice(i);
            console.log('resoultresoultresoult===' + JSON.stringify(resoult));
          } else {
            res.rows = res.rows;
          }

          if (resoult.length < 5) {
            if (res.rows[i].isrecommend == 0) {
              resoult.push(res.rows[i]);
            }
          } else {
            resoult;
          }
        }
        res.rows = resoult;
        //爆款置顶
        // let resoult
        // if(res.rows[i].isrecommend==0){
        //   resoult=res.rows.splice(i);
        //   for(let j=0;j<resoult.length;j++){
        //     // console.log('fanhui======'+JSON.stringify(resoult));
        //     res.rows.unshift(resoult[j]);
        //   }
        // }else{
        //   res.rows=res.rows;
        // }

        //  this.StoreID = res.rows[0].storeid.toString(36);
      }
      // this.goods_list = res.rows;
      if (context.flipper_page === 0) {
        context.goods_list = res.rows;
        this.StoreID = context.goods_list[0].storeid.toString(36);
      } else {
        for (let item of res.rows) {
          context.goods_list.push(item);
          this.StoreID = context.goods_list[0].storeid.toString(36);
        }
      };
      //  console.log('iddddd====dd'+this.StoreID);
      //门店商品少于5个，则‘查看更多商品’不显示
      if (context.goods_list.length >= 5) {
        this.moreShop = true;
      } else {
        this.moreShop = false;
      }

    }, this);
  }




  ionViewDidLoad() {
    this.zengsonglist();
    console.log('ionViewDidLoad ShopDetailsPage');
    this.getGoods(this.shopInfo.store36id, this.infiniteScroll);
    this.chaxunrenwu();
    this.priviLege();
    this.service();
    //没有门店图片，默认门店首图为门店图片，
    if (this.shopInfo.storeimgs == undefined) {
      this.StoreImg.push(this.title_banner);
    } else {
      this.StoreImg = this.shopInfo.storeimgs.split(";");
      for (let i = 0; i < this.StoreImg.length; i++) {
        this.StoreImg[i] = this.storeimgsurl_720 + this.StoreImg[i];
      }

    }
    let tel = document.getElementById('a_tel');
    tel.ontouchstart = function () {
      tel.style.backgroundColor = "#efeff4";
    };
    tel.ontouchend = function () {
      // 还原白色
      tel.style.backgroundColor = "transparent";
    };
  }


  ionViewWillLeave() {
    console.log('shopDetail ionViewWillLeave()')

  }

  shangPuDianHua() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: '',
      buttons: [
        {
          // '<a [href]=+'+'"'+this.tel_str+'">'+this.shopInfo.storetel+'</a>'
          text: this.shopInfo.storetel,
          cssClass: '',
          handler: () => {

            console.log('callSeller');
            // this.callNumber.callNumber(this.shopInfo.storetel, true)
            //   .then(() => { console.log('拨打电话失败'); showToast('拨打电话失败') })
            //   .catch(() => { console.log('拨打电话失败'); showToast('拨打电话失败') });
            actionSheet.dismiss();
          }
        },
        {
          text: '取消',
          cssClass: '',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  toFollow() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      let url = HttpUrl.followShop + this.shopInfo.store36id;  //#	int	门店36ID
      this.http.httpMethodContext(url, {}, (res, context) => {
        showToast('关注成功');
        context.followed = true;
        context.navParams.data.isfollowed = 'true';
      }, this);
    }

  }


  Preferential(shopInfo, item) {
    //  console.log('item==========='+JSON.stringify(item));
    let myModal = this.modalCtrl.create(PreferentialModulePage, { key1: shopInfo, key2: item, });
    myModal.present();
  }


  priviLege() {
    // let dataParams = {
    //   "bean": {
    //     storeid:this.shopInfo.storeid,
    //     status:10

    //   }
    // }
    let url = HttpUrl.privilege + this.shopInfo.store36id;
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (res.length == 0) {
        this.cang = false;
      }
      // console.log('fffffffffffffff' + res);
      console.log('res.length===' + JSON.stringify(res));
      if (typeof (res) == 'undefined' || res.length == 0) {
        this.tho = true;
      } else {
        for (let i = 0; i < res.length; i++) {
          if (res[i].validday == 0) {
            res[i].validday = "长期有效";
            res[i].youxiaoriqi = true;
            res[i].kaishi = true;

          } else {

            let newDate1: any = new Date();
            newDate1.setTime(res[i].starttime);
            let start = newDate1.format('yyyy-MM-dd');

            let newDate2: any = new Date();
            newDate2.setTime(res[i].endtime);
            let end = newDate2.format('yyyy-MM-dd');
            res[i].validday = start + '起—' + end + '止';

            //过期优惠列表不显示；
            let today = new Date();
            let myDate = today.toLocaleDateString();
            let daytime = new Date(myDate).getTime();
            if (new Date(end).getTime() >= daytime) {
              res[i].youxiaoriqi = true;
            } else {
              res[i].youxiaoriqi = false;
            }

            //未开始的活动 按钮
            if (res[i].starttime > daytime) {
              res[i].weikaishi = true;
              res[i].kaishi = false;
            } else {
              res[i].weikaishi = false;
              res[i].kaishi = true;
            }
          }

        }
        context.yhPrivilege = res;
        //加上分享赠送和优惠不能超过3条列表
        if (context.yhPrivilege.length > 2 && context.cang == true) {
          if (context.zengsong == true) {
            context.yhPrivilegelist.push(context.yhPrivilege[0]);
            context.yhPrivilegelist.push(context.yhPrivilege[1]);
          } else {
            if (context.zengsong == false) {
              context.cang = false;
            }
            context.yhPrivilegelist.push(context.yhPrivilege[0]);
            context.yhPrivilegelist.push(context.yhPrivilege[1]);
            context.yhPrivilegelist.push(context.yhPrivilege[2]);
          }
        } else {
          context.yhPrivilegelist = context.yhPrivilege;
          context.cang = false;
        }

        //
        context.tho = false;
        context.yhfirst = context.yhPrivilegelist[0];
        context.yhPrivilegelist.shift();
        
      }

    }, this)
  }

  huoqugenduo() {
    this.cang = false;
    this.priviLege();
    // this.yhPrivilegelist=this.yhPrivilege;
  }


  // 商品详情
  detail(goodsInfo, yhPrivilege, storeInfo) {
    let navParams={goodsInfo,storeInfo}
    this.navCtrl.push('GoodsxiangqingPage', navParams);
  }
    // detail(item, yhPrivilege, shopInfo) {
    //   let modalDet = this.modalCtrl.create(ShopParticularsPage, { key1: item, key2: yhPrivilege, key3: shopInfo, key4: this.fenxiangzengnsong });
    //   modalDet.present();
    // }

  zengsonglist() {
    let url = HttpUrl.huoqurenwu + this.shopInfo.store36id;
    this.http.httpMethodContext(url, {}, (res, context) => {
      console.log('rw===' + JSON.stringify(res))
      console.log('rwID' + this.shopInfo.store36id);
      this.fenxiangzengnsong = res;
      if (typeof (res) == 'undefined' || res == null) {
        this.zengsong = false;
      } else {
        res = res;
        this.zengsong = true;
        this.merchid = res.merchid;
        //代金券
        if (typeof (res.cashvalue) == 'undefined' || res.cashvalue == 0) {
          this.fenxiang1 = false;
        } else {
          res.cashvalue = Math.floor(res.cashvalue / 100);
          this.fenxiang1 = true;
        }

        //通话
        if (typeof (res.voicetimes) == 'undefined' || res.voicetimes == 0) {
          this.fenxiang2 = false;
        } else {
          res.voicetimes = Math.floor(res.voicetimes / 60);
          this.fenxiang2 = true;
        }

        // 流量
        if (typeof (res.fluxpkgid) == 'undefined' || res.fluxpkgid == 0 || typeof (res.fluxPackage) == 'undefined') {
          this.fenxiang3 = false;
        } else {
          res.fluxPackage.ydfluxkbs = Math.floor(res.fluxPackage.ydfluxkbs / 1024);
          this.fenxiang3 = true;
        }


        if (typeof (res.costmoneyneed) == 'undefined' || res.costmoneyneed == 0) {
          this.zengsongmoshi = true;
        } else {
          this.zengsongmoshi = false;
        }
        let newDate1: any = new Date();
        newDate1.setTime(res.starttime);
        let start = newDate1.format('yyyy-MM-dd');

        let newDate2: any = new Date();
        newDate2.setTime(res.endtime);
        let end = newDate2.format('yyyy-MM-dd');
        res.qishiriqi = start + '起—' + end + '止';
        if (res.validday == 0) {

          res.qishiriqi = '长期有效';
        }
      }
      console.log('任务==' + JSON.stringify(res));
    }, this);
  }

  chaxunrenwu() {
    //查询分享任务
    // var ;
    let data = {
      bean: {
        type: 1,
        storeid: this.shopInfo.storeid,
      }
    }
    this.http.httpMethodContext(HttpUrl.fenxiangrenwu, data, (res, context) => {
      console.log('任务==IDIDID' + JSON.stringify(res.result));
      if (typeof (res.result) == 'undefined' || typeof (res.result.taskid) == 'undefined') {
        context.Taskid = '';
      } else {
        context.Taskid = res.result.taskid;
      }

      console.log('asdasasd' + context.Taskid)
    }, this);

  }

  fenxiang() {
    console.log('asdasasd' + this.Taskid);
    // console.log(JSON.stringify(this.shopInfo.storename));
    // console.log(JSON.stringify(this.StoreID));
    // console.log(JSON.stringify(this.title_banner));

    (<any>window).Cordova.exec((res) => {
    }, (err) => { showToast('分享失败'); },
      "RyzShare", "share",
      [{
        "shareButtonLabe": "分享",
        "cancelButtonLabel": "取消",
        "shareTitle": "分享内容",

        "title": this.shopInfo.storename,
        "text": '强力推荐！客服全程服务到位，还赠送了流量和话费。',
        "url": "http://merch.diancall.com/modules/share/sharestore/sharestore.html" + "?StoreId=" + this.StoreID + "?TaskId=" + this.Taskid,
        "imagePath": this.title_banner
      }]);
  }

  doInfinite(infiniteScroll) {
    // setTimeout(() => {
    this.infiniteScroll = infiniteScroll;
    if (this.flipper_page < this.total) {
      this.flipper_page += this.limit;
      this.getGoods(this.shopInfo.store36id, infiniteScroll);
      infiniteScroll.complete();
    } else {
      // showToast('没有更多了...');
      infiniteScroll.complete();
      console.log(this.total);
    }

    // }, 200);
  }
  //查看全部商品
  getAllGoods() {
    let data = { 'yhPrivilege': this.yhPrivilege, 'shopInfo': this.shopInfo };
    this.navCtrl.push(GoodsManagePage, data);
  }
  //展开优惠列表
  zhankai(){
    this.tholist = !this.tholist;
  }
  //查询预约服务列表
  service(){
    console.log('进入service');
    // debugger;
    // let dataparams = {bean:this.merchid};
    let dataparams = {
      bean:{merchid:this.navParams.data.merchid}
    };
  //let dataparams ={};
     this.http.httpMethodContext(HttpUrl.queryService, dataparams, (res, context) => {
      console.log('进入service===='+JSON.stringify(res));
        if(res.bookinfosheet.rows.length>=0){
          let arr = res.bookinfosheet.rows;
          arr.forEach(element => {
            element.serviceprice = (element.serviceprice/100).toFixed(2);
            context.booklist.push(element);
          });
        }
        if(res.deliveryrecordsheet.rows.length>0){
          let arr = res.deliveryrecordsheet.rows;
          // arr.forEach(element => {
          //   context.deliverylist.push(element);
          // });
          context.deliverylist.push(arr[0]);
        }
        
       if(context.booklist.length>0){
         context.isService = true;
         
       }
       if(context.deliverylist.length>0){
         context.isDelivery = true;
       }
        console.log("booklist==="+JSON.stringify(context.booklist));
        console.log('cccccccccc===='+context.isDelivery+"ddddddddddd====="+context.isService);
     },this)
  }
  //预约服务页面
  book(item){
    console.log(JSON.stringify(item));
    this.navCtrl.push('BookServicePage',{bookid:item.bookid,storeid:this.shopInfo.storeid,servicename:item.servicename,servicestarttime:item.servicestarttime,serviceendtime:item.serviceendtime,serviceprice:item.serviceprice});
  }
  //点击门店图片进入滑动查看图片页面
 preview(item) {
  let modal = this.modalCtrl.create('SlideImgPage', { currentImg: item, allImgs: this.StoreImg });
  modal.onDidDismiss((data) => {
  console.log("onDidDismiss==" + JSON.stringify(data));
  });
  modal.present();

}
qianggou(){
  this.navCtrl.push('HomeDeliveryDetailPage');
}
}


