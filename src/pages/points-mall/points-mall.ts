import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast } from '../../common/global';
import { PointsExchangePage } from '../PointsExchange/PointsExchange';



@Component({
  selector: 'page-points-mall',
  templateUrl: 'points-mall.html'
})
export class PointsMallPage {
  context: this;
  points_mall_title_img: string;
  points_type: string;
  is_tab1_active: boolean = true;
  tab1_class;
  tab2_class;
  tab3_class;

  telecomList = [];//电信总的数据
  telecomLast: number;//最后一行剩一个时，序号
  telecomRaw: Array<number> = new Array();//行号
  lastTelecomShow: boolean = false;//最后一行剩一个时，是否显示

  Unicom = {
    unicomList: [],
    unicomLast: 0,
    unicomRaw: [],
    lastUnicomShow: false
  }
  Mobile = {
    mobileList: [],
    mobileLast: 0,
    mobileRaw: [],
    lastMobileShow: false
  }
  Voice = {
    list: [],
    last: 0,
    raw: [],
    show: false
  }

  traffic_description: string = "国内流量";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
    this.points_mall_title_img = "assets/img/jfdh_bg_banner@2x.png";
    this.points_type = "china_telecom";
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.tab3_class = "text-off";
    this.context = this;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsMallPage');
    this.http.httpMethodContext(HttpUrl.trafficCharge, {}, this.getTrafficChargeOnSuccess, this.context);

  }

  getTrafficChargeOnSuccess(res, context) {
    console.log("获取流量套餐成功！");
    res = {"rows":[{"createtime":1484033137986,"display":1000,"experthing36id":"7pt","experthingid":10001,"sellexper":5000,"status":10,"subtitle":"国内流量","subtype":8,"title":"电信1G定向流量","type":10,"value":1048576},{"createtime":1484033173676,"display":1000,"experthing36id":"7pu","experthingid":10002,"sellexper":9000,"status":10,"subtitle":"国内流量","subtype":8,"title":"电信2G定向流量","type":10,"value":2097152},{"createtime":1484033186316,"display":1000,"experthing36id":"7pv","experthingid":10003,"sellexper":17500,"status":10,"subtitle":"国内流量","subtype":8,"title":"电信4G定向流量","type":10,"value":4194304},{"createtime":1484033205653,"display":1000,"experthing36id":"7pw","experthingid":10004,"sellexper":32000,"status":10,"subtitle":"国内流量","subtype":8,"title":"电信8G定向流量","type":10,"value":8388608},{"createtime":1484033137986,"display":1000,"experthing36id":"7pt","experthingid":10001,"sellexper":5000,"status":10,"subtitle":"国内流量","subtype":8,"title":"电信1G定向流量","type":20,"value":1048576}],"total":4}
    
    //区分流量or语音
    let flows_arr = [];
    
    for (let item of res.rows) {
      if (item.type === 10) {
        //流量
        flows_arr.push(item);
      } else {
        //语音
        context.Voice.list.push(item);
      }
    }
    //区分流量运营商
    for (let item of flows_arr) {
      switch (item.subtype) {
        case 8:  //电信
          context.telecomList.push(item);
          break;
        case 4:  //联通
          context.Unicom.unicomList.push(item);
          break;
        case 2:  //移动
          context.Mobile.mobileList.push(item);
          break;
        default:
          break;
      }
    }
    context.formatFlowsData();
    context.formatVoiceData();
  }
  
  formatVoiceData() {
    let res = this.Voice.list;
    this.Voice.last = res.length - 1;
    if (res.length % 2 != 0) {
      this.Voice.show = true;
      this.Voice.raw.length = Math.floor(res.length / 2);

    } else {
      this.Voice.show = false;
      this.Voice.raw.length = res.length / 2;

    }
    for (let i = 0; i < this.Voice.raw.length; i++) {
      this.Voice.raw[i] = i;
    }
    
  }

  formatFlowsData() {
    for (let i = 0; i < 3; i++) {
      //电信
      if (i === 0) {
        let res = this.telecomList;
        this.telecomLast = res.length - 1;
        if (res.length % 2 != 0) {
          this.lastTelecomShow = true;
          this.telecomRaw.length = Math.floor(res.length / 2);

        } else {
          this.lastTelecomShow = false;
          this.telecomRaw.length = res.length / 2;

        }
        for (let i = 0; i < this.telecomRaw.length; i++) {
          this.telecomRaw[i] = i;
        }
      }
      //联通
      if (i === 1) {
        let res = this.Unicom.unicomList;
        this.Unicom.unicomLast = res.length - 1;
        if (res.length % 2 != 0) {
          this.Unicom.lastUnicomShow = true;
          this.Unicom.unicomRaw.length = Math.floor(res.length / 2);

        } else {
          this.Unicom.lastUnicomShow = false;
          this.Unicom.unicomRaw.length = res.length / 2;

        }
        for (let i = 0; i < this.Unicom.unicomRaw.length; i++) {
          this.Unicom.unicomRaw[i] = i;
        }

      }
      //移动
      if (i === 2) {
        let res = this.Mobile.mobileList;
        this.Mobile.mobileLast = res.length - 1;
        if (res.length % 2 != 0) {
          this.Mobile.lastMobileShow = true;
          this.Mobile.mobileRaw.length = Math.floor(res.length / 2);

        } else {
          this.Mobile.lastMobileShow = false;
          this.Mobile.mobileRaw.length = res.length / 2;

        }
        for (let i = 0; i < this.Mobile.mobileRaw.length; i++) {
          this.Mobile.mobileRaw[i] = i;
        }

      }
    }

  }

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

  selectedChinaTelecom() {
    console.log('selectedChinaTelecom');
    this.points_type = "china_telecom";
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.tab3_class = "text-off";
  }
  selectedChinaUnicom() {
    console.log('selectedChinaUnicom');
    this.points_type = "china_unicom";
    this.tab1_class = "text-off";
    this.tab2_class = "text-actived";
    this.tab3_class = "text-off";

  }
  selectedChinaMobile() {
    console.log('selectedChinaMobile');
    this.points_type = "china_mobile";
    this.tab1_class = "text-off";
    this.tab2_class = "text-off";
    this.tab3_class = "text-actived";
  }

  active() {
    return this.is_tab1_active;
  }

  pointsExchange(id) {
    this.navCtrl.push(PointsExchangePage, { goods_id: id });
  }

}
