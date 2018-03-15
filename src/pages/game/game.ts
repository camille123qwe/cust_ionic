import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl,showToast } from '../../common/global';
import { WebPage } from '../web/web';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  last_createtime = 0;  //加載更多的時間戳
  top_list = [];
  new_list = [];
  hot_list = [];
  str = false;
  hotgame = false;
  bam = false;
	qidai = false;
	
	
  left = {};
  middle = {};
  right = {};
  flipper_page = 0;
  total = 0;
  infiniteScroll;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.getData();
  }
  getData() {
    this.getTop();
    this.getNew();
    this.getHot(this.infiniteScroll);
  }
  getTop() {
    // {"createtime":14865328450000,"display":1000,"gameid":100001,"gameimg":"http://open.h5.gamedog.cn/Uploads/image/game/20161124/20161124184746_82337.png","gamename":"大圣西游","gametype":10,"gameurl":"http://sdk.h5.gamedog.cn/game/78/27/","status":10},
    this.http.httpMethodContext(HttpUrl.gameTop, {}, (res, context) => {
    	console.log('xxxxxxxxxx'+JSON.stringify(res.length))
    	if(res.length==0){
    		this.bam=true;
    	}else{
    		this.qidai=true;
    		context.top_list = res;
	      context.middle = context.top_list[0];
	      context.left = context.top_list[1];
	      context.right = context.top_list[2];
    	}
      

    }, this);
  }
  getNew() {
    this.http.httpMethodContext(HttpUrl.gameNew, {}, (res, context) => {
//  			
					 console.log('hotwwwwwww'+JSON.stringify(res))
					if(res.length==0){
						this.str=true;
					}else{
						this.qidai=true;
						context.new_list = res;
					}



//  		for(let i=0;i<res.length;i++){
//  			 console.log('newwwwwww'+JSON.stringify(res[i].gamename));
//  			 if(res!== ''){
//  			 	context.new_list = res;
//  			 }else{
//  			 	res[i].gamename='暂请期待';
//  			  this.str = true;
//  			 	context.new_list = res;
//  			 	console.log('newwwwwww'+JSON.stringify(res[i].gamename));
//  			 }
//  		}
    
      
      
    }, this);
  }
  getHot(infiniteScroll) {
    let data = {
      flipper: {
        offset: this.flipper_page
      }
    }
    this.http.httpMethodContext(HttpUrl.gameHot, data, (res, context) => {
       if(typeof(infiniteScroll) == undefined){
        console.log('++++++++++++++++++++++++'+infiniteScroll);
           infiniteScroll.complete();
      }
      context.total = res.total;
      console.log('hottttttttt'+JSON.stringify(res.total))
      
      if(res.total<0){
      	this.hotgame = true;
      }else{
      	 this.qidai=true;
      	 if (context.flipper_page === 0) {
		        context.hot_list = res.rows;
		      } else {
		        for (let item of res.rows) {
		          context.hot_list.push(item);
		        }
		      }
      }
     
    }, this);
  }

  startGame(item) {
    this.navCtrl.push(WebPage, {
      title: item.gamename,
      url: item.gameurl
    });
  }
  
  doInfinite(infiniteScroll) {
    // setTimeout(() => {
//    console.log('加载更多');
      if (this.flipper_page < this.total) {
        this.flipper_page = this.flipper_page+20;
        this.getHot(infiniteScroll);
        infiniteScroll.complete();
      }else{
//    	console.log("9999999999999999999"+'加载更多');
        // showToast('没有更多了...');
        infiniteScroll.complete();
      }
    // }, 200);
  }
}
