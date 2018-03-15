import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast } from '../../common/global';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  tab1_class;
  tab2_class;
  msg_type: string;
  readList = [];
  unReadList = [];
  xiSh = true;
  infiniteScroll;
  left_side = { rows: [], offset: 0, total: 0 };  //未读
  right_side = { rows: [], offset: 0, total: 0 }; //已读
  limit = 20;
  loadingShops = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.msg_type = 'unreadMsg';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');

    this.getUnReadMsg(this.infiniteScroll);
  }

  getReadMsg(infiniteScroll) {
    this.loadingShops = true;
    let dataParams = {
      flipper: {
        limit: this.limit,
        offset: this.right_side.offset,
        // sort: 'createtime DESC'
      }
    }
    this.http.httpMethodContext(HttpUrl.readMessages, dataParams, (res, context) => {
      // {"rows":[{"action":"优惠券赠送","attachid":"100000042","content":"来源：红柚子科技大冲店优惠券；\n活动内容：全棉13372面料四件套新春大特价；\n赠送流量数:30m。","createtime":1495620090880,"custmessageid":"3b2ozl0j32tl3wg","custuserid":200000001,"module":"优惠券","objectid":"hv05d-bwo3l-3b2ozl-0j32tl3q5","readtime":0,"status":10,"title":"红柚子科技大冲店优惠券送流量"},{"action":"优惠券赠送","attachid":"100000042","content":"来源：红柚子科技大冲店优惠券；\n活动内容：全棉13372面料四件套新春大特价；\n赠送语音数:60分钟.","createtime":1495620090752,"custmessageid":"3b2ozl0j32tl3sw","custuserid":200000001,"module":"优惠券","objectid":"hv05d-bwo3l-3b2ozl-0j32tl3q5","readtime":0,"status":10,"title":"红柚子科技大冲店优惠券送语音"}],"total":2}
      context.loadingShops = false;
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }
      context.right_side.rows = res.rows;
      context.right_side.total = res.total;
      if (res.total == -1) {
        this.xiSh = false
      } else {
        this.xiSh = true;
        let newDate1: any = new Date();
        for (let item of res.rows) {
          newDate1 = new Date();
          newDate1.setTime(item.readtime);
          item.readtime = newDate1.format('MM-dd hh:mm');
        }
        context.right_side.total = res.total;
        if (context.right_side.offset == 0) {
          context.right_side.rows = res.rows;
        } else {
          for (let item of res.rows) {
            context.right_side.rows.push(item);
          }
        }

      }


    }, this);
  }
  getUnReadMsg(infiniteScroll) {
    this.loadingShops = true;
    let dataParams = {
      flipper: {
        limit: this.limit,
        offset: this.left_side.offset,
        // sort: 'createtime DESC'
      }
    }
    this.http.httpMethodContext(HttpUrl.unReadMessages, dataParams, (res, context) => {
      console.log('rows===1'+JSON.stringify(res.rows))
      context.loadingShops = false;
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }
      if (res.total == -1) {
        console.log('rows===2'+JSON.stringify(res.rows))
        this.xiSh = false;
      } else {
        this.xiSh = true;
        let newDate1: any = new Date();
        for (let item of res.rows) {
          newDate1 = new Date();
          newDate1.setTime(item.createtime);
          item.createtime = newDate1.format('MM-dd hh:mm');
        }

        context.left_side.total = res.total;
        if (context.left_side.offset == 0) {
          context.left_side.rows = res.rows;
        } else {
          for (let item of res.rows) {
            context.left_side.rows.push(item);
          }
        }
       

      }



    }, this);
  }

  formatData(array) {
    let newDate1: any = new Date();
    for (let item of array) {
      newDate1 = new Date();
      newDate1.setTime(item.createtime);
      item.createtime = newDate1.format('yyyy-MM-dd');
    }
    return array;
  }
  selectedUnread() {
    this.msg_type = 'unreadMsg';
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.getUnReadMsg(this.infiniteScroll);
  }
  selectedRead() {
    this.msg_type = 'readMsg';
    this.tab1_class = "text-off";
    this.tab2_class = "text-actived";
    this.getReadMsg(this.infiniteScroll);
  }
  toRead(item) {
    let url = HttpUrl.hasReadMessages + item.custmessageid;  //加id
    this.http.httpMethodContext(url, {}, (res, context) => {
      // {"result":{"action":"优惠券赠送","attachid":"100000042","content":"来源：红柚子科技大冲店优惠券；\n活动内容：全棉13372面料四件套新春大特价；\n赠送流量数:30m。","createtime":1495620090880,"custmessageid":"3b2ozl0j32tl3wg","custuserid":200000001,"module":"优惠券","movetime":1495621871539,"objectid":"hv05d-bwo3l-3b2ozl-0j32tl3q5","readtime":1495621871539,"status":20,"title":"红柚子科技大冲店优惠券送流量"},"retcode":0,"success":true}
      if (res.retcode == 0) {
        context.left_side.rows.splice(context.left_side.rows.indexOf(item), 1);
      } else {
        console.log('阅读消息失败');
      }


    }, this);
  }

  doInfinite(infiniteScroll) {
    // setTimeout(() => {
    this.infiniteScroll = infiniteScroll;

    switch (this.msg_type) {
      case 'unreadMsg':
        if (this.left_side.offset + this.limit < this.left_side.total && !this.loadingShops) {
          console.log('加载更多');
          this.left_side.offset += this.limit;
          this.getUnReadMsg(infiniteScroll);
        }
        break;
      case 'readMsg':
        if (this.right_side.offset + this.limit < this.right_side.total && !this.loadingShops) {
          console.log('加载更多');
          this.right_side.offset += + this.limit;
          this.getReadMsg(infiniteScroll);
        }
        break;
      default:
        // context.globalProvider.presentToast('没有更多了...');
        break;
    }
    infiniteScroll.complete();
    // }, 200);
  }
}
