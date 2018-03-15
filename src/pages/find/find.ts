import { Component } from '@angular/core';
import { NavController, App,ModalController } from 'ionic-angular';
import { ShopDetailsPage } from '../shop-details/shop-details';
import { CitySelectionPage } from '../city-selection/city-selection';
import { SearchShopPage } from '../search-shop/search-shop';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, constVar, globalVar } from '../../common/global';
import { GlobalProvider }from '../../providers/global-provider';

@Component({
  selector: 'page-find',
  templateUrl: 'find.html'
})
export class FindPage {
  shousuo_img = 'assets/img/zhoubian_shousuo@2x.png';
  myInput: string = '';
  img_class: string = 'small_img_class';
  city_page = CitySelectionPage;
  arround_shops = [];
  storefaceurl_300 = constVar.storefaceurl_300;
  flipper_page = 0;
  total = 0;
  city='';
  itemD;
  itemDic;
  Val;
  val;
  infiniteScroll;
  mapArr=[];
  
  mapitem;
  constructor(public globalProvider: GlobalProvider,public navCtrl: NavController, private app: App,public modalCtrl: ModalController, private http: HttpGet) {

  }


ionViewDidEnter (){

  this.city = globalVar.location.city;
  // console.log('城市城市城市城市城市城市城市城市'+JSON.stringify(globalVar.location.city))
  this.getArroundShop(this.infiniteScroll);

}

  ionViewDidLoad() {
    this.getArroundShop(this.infiniteScroll);
    
    
  }
  getArroundShop(infiniteScroll) {
    
    // console.log('longitude==' + globalVar.location.longitude + ' latitude==' + globalVar.location.latitude)
    let data = {
      bean: {
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city,
      },
      flipper: {
        offset: this.flipper_page
      }
    }
    //  console.log('城市城市城市城市城市城市城市城市'+JSON.stringify(globalVar.location.city));
    this.http.httpMethodContext(HttpUrl.arroundShops, data, (res, context) => {
      if(typeof(infiniteScroll) == undefined){
        // console.log('++++++++++++++++++++++++'+infiniteScroll);
           infiniteScroll.complete();
      }
      if (context.flipper_page === 0) {
        context.arround_shops = res.rows;
      } else {
        for (let item of res.rows) {
          context.arround_shops.push(item);
        }
      }
      // console.log(context.arround_shops)
      
        for(let i=0;i<context.arround_shops.length;i++){
           let storeaddr=context.arround_shops[i].storeaddr;
          let storename=context.arround_shops[i].storename;
          let longitude=context.arround_shops[i].longitude;
          let latitude=context.arround_shops[i].latitude;
          let storeid=context.arround_shops[i].storeid;
           context.mapArr.push({'title':storeaddr,'subtitle':storename+storeid,'latitude':+latitude,'longtitude':longitude});

					if(context.arround_shops[i].buycount==0){
	       			this.Val=true;
	       		}else{
	       			this.Val=false;
	       		}
	       		
	       		if(context.arround_shops[i].goodscount==0){
	       			this.val=true;
	       		}else{
	       			this.val=false;
	       		}       		
       		
       	  
       	  if(context.arround_shops[i].distance===0){
      	
		      	context.arround_shops[i].distance="";
		      	
			    }else if(context.arround_shops[i].distance<=1000){
      	
		      	context.arround_shops[i].distance="<"+10+"m";
		      	
			    }else if(context.arround_shops[i].distance>=100000){
			    	
			    	context.arround_shops[i].distance=Math.floor(context.arround_shops[i].distance/1000)/100+"km"
			    	
			    }else{
			    	
			    	context.arround_shops[i].distance=Math.floor(context.arround_shops[i].distance/1000)+"m";
			    	
			    }
       }
			  // console.log('mapArr==========='+JSON.stringify(context.mapArr))  
      
    }, this);
  }

   obserAnotationClick(arround_shops){
       
      // let ssID=30000014;
      //找到匹配相同id 的对象
      

        console.log('6666='+JSON.stringify(this.mapitem));
    (<any>window).Cordova.exec((res)=>{
      let shopID=res;
      let j;
      for(let i=0;i<arround_shops.length;i++){
        j=arround_shops[i];
        // console.log(j.merchid)
          if(shopID==j.storeid){
            console.log(j.storeid)
           this.mapitem=j;
          }
      };
     console.log('red==' + res);
      console.log('jjj===============mapitem===='+JSON.stringify(this.mapitem));
      //添加页面
       this.app.getRootNav().push(ShopDetailsPage,this.mapitem)
       
    },(err) =>{showToast('失败');}, "BDLocation", "obserAnotationClick");
    console.log('666');
    this.location();
  }


  location() {
    
    console.log(JSON.stringify(this.mapArr));
		(<any>window).Cordova.exec((res) => {
    }, (err) => {showToast('地图展示失败'); }, "BDLocation", "showMap",this.mapArr);
    
  }
  onSearchInput(event) {
      this.navCtrl.push(SearchShopPage)

    // let modal = this.modalCtrl.create(SearchShopPage);
    // modal.onDidDismiss(data => {
    //   let params = data.shop;
    //   if (typeof (params) !== 'undefined') {
    //   }
    // });
    // modal.present();
  }
  getShopDetails(item) {
    item.followed = false;
    this.app.getRootNav().push(ShopDetailsPage,item);
  }
  doInfinite(infiniteScroll) {
    // setTimeout(() => {
     this.infiniteScroll=infiniteScroll;
      if (this.flipper_page < this.total) {
        this.flipper_page  += 20;
        this.getArroundShop(infiniteScroll);
        infiniteScroll.complete();
      } else {
        // showToast('没有更多了...');
        infiniteScroll.complete();
      }

    // }, 200);
  }
}
