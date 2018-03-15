import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { WebPage } from '../web/web';
import { PointsMallPage } from '../points-mall/points-mall';
import { BeautyPhotosPage } from '../beauty-photos/beauty-photos';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, saveLoginInfo,globalVar} from '../../common/global';
import { NewsPage } from '../news/news';
import { JokePage } from '../joke/joke';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-park',
  templateUrl: 'park.html'
})
export class ParkPage {
  park_title_banner: string;
  pard_grids;
  park_list = [];
  small_img_class = "img_120_90";
  rowShow:boolean;
  // parkGrid=false; 
 
  constructor(public navCtrl: NavController, private app: App, private http: HttpGet,) {
    // this.park_list = [{ img: "assets/img/ly_imge2@2x.png", header: "特朗普就职典礼", content: "百度视频", time: "01-20" },
    // { img: "assets/img/ly_imge1@2x.png", header: "新闻联播迎来新主播", content: "百度视频", time: "01-21" },];
    

    this.park_title_banner = "assets/img/ly_bg_banner@2x.png";

    this.pard_grids=globalVar.Pard_grids;
    if(this.pard_grids[0].isShow==true && this.pard_grids[1].isShow==true && this.pard_grids[2].isShow==true && this.pard_grids[3].isShow==true){
           this.rowShow=true;
    }
    // console.log('park'+JSON.stringify(this.pard_grids));
  }

  ionViewDidLoad() {
   
    this.getTopNews();
    
   
  }

  
  
  goNextPage(id) {
    console.log("id==" + id);
    let nextPage;
    let data = {};

    switch (id) {
      case 'wanghong':
        nextPage = WebPage;
        data = {
          title: '网红直播',
          url: 'http://m.v.6.cn/live/u1?src=ummeda5263&forceback=1'
        };

        break;
      case 'meinv':
        nextPage = BeautyPhotosPage;
        break;
      case 'youxi':
        nextPage = GamePage;
        break;
      case 'kaixin':
        nextPage = JokePage;
        break; 
      default:

        break;
    }
    this.app.getRootNav().push(nextPage, data);
  }

  getTopNews() {
    console.log('ts===' + new Date().getTime());
    let dataParams = {
      "bean": {
        newstype: 'top',
        createtime: new Date().getTime()
      },
      flipper: {
        limit: 10,
        offset: 10,
        // sort:
      }
    }

    // if(res){
    //     this.parkGrid=true;
    //     console.log(66)
    //   }else{
    //     this.parkGrid=false;
    //   }
     

    
    this.http.httpMethodContext(HttpUrl.queryNews, dataParams, (res, context) => {
      
      for (let item of res.rows) {
        let object = { img: '', header: '', content: '', time: '', newsurl: '' };
        object.img = item.imgurl;
        object.header = item.title;
        // object.content = '百度新闻';
        object.content = item.author;
        object.time = item.newsday;
        object.newsurl = item.newsurl;

        this.park_list.push(object);
        
      }
    }, this);
  }
  goNewsDetails(newsurl) {
    this.app.getRootNav().push(WebPage, {
      title: '头条新闻',
      url: newsurl

    });
  }
  goNewsPage() {
    this.app.getRootNav().push(NewsPage);
  }

  goLivePage() {
    this.app.getRootNav().push(WebPage, {
      title: '网红直播',
      url: 'http://www.huajiao.com/mobile/index'
    });
  }
  goPointsMall() {
    this.app.getRootNav().push(PointsMallPage, {})
  }
}

