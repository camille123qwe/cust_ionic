import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { MyVoucherPage } from '../../pages/my-voucher/my-voucher';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, constVar, globalVar } from '../../common/global';
/*
  Generated class for the CardSetting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-card-setting',
  templateUrl: 'card-setting.html'
})
export class CardSettingPage {
   Cards_res;
   stader;
   userid;
   
   dataday;
   storeaddr;
   storename;
   youhuiList=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,private http: HttpGet,) {
   this.userid = localStorage.getItem('custuserid');
   this.Cards_res=this.navParams.data;
   console.log('Cards_res========='+JSON.stringify(this.Cards_res.status));
   if(typeof(this.Cards_res.fluxpkgid1) !== 'undefined' &&  this.Cards_res.fluxpkgid1>0){
    this.youhuiList.push(this.Cards_res.fluxPackage1.ydfluxkbs/1024+'流量');
   }else{
     console.log(this.Cards_res.fluxpkgid1);
   };

   if(typeof(this.Cards_res.voicetimes1) !== 'undefined' &&  this.Cards_res.voicetimes1>0){
     this.youhuiList.push(this.Cards_res.voicetimes1/60+'分钟通话'); 
   }else{
     console.log(this.Cards_res.voicetimes1);
   };

   if(typeof(this.Cards_res.cashvalue1) !== 'undefined' &&  this.Cards_res.cashvalue1>0){
    this.youhuiList.push(this.Cards_res.cashvalue1/100+'代金券'); 
   }else{
     console.log(this.Cards_res.cashvalue1);
   };
   console.log('youhuiList'+JSON.stringify(this.youhuiList))
   if(this.navParams.data.storeInfo==undefined){
        this.storename='此卡暂未激活';
        this.storeaddr='';
        this.dataday='暂无有效期';
        // console.log(666)
      }else {
        this.storename= this.navParams.data.storeInfo.storename;
        this.storeaddr=this.navParams.data.storeInfo.storeaddr;
        if(this.navParams.data.validday==0){
            this.dataday='长期有效'
          }else{
              let newDate1: any = new Date();
                  newDate1.setTime(this.navParams.data.starttime);
                  // console.log('开始时间starttime'+this.navParams.data.starttime)
                  let start = newDate1.format('yyyy-MM-dd');

              let newDate2: any = new Date();
                  newDate2.setTime(this.navParams.data.endtime);
                  // console.log('结束时间endtime'+this.navParams.data.endtime)
                  let end = newDate2.format('yyyy-MM-dd');
                  this.dataday = '有效期至：'+ end;
          }
      }
   } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CardSettingPage');
  }


    //添加优惠卡
   poarfnin(){
      console.log('id1=============='+this.userid)
      console.log('Cards_res========='+JSON.stringify(this.Cards_res.status));
     if(this.Cards_res.status==10){
       showToast('此卡暂未激活')
      //  alert('此卡暂未激活')
     }else if(this.Cards_res.status==30){
        showToast('此优惠卡已被添加')
        // alert('此优惠卡已被添加')
     }else if(this.Cards_res.status==40){
        showToast('此优惠卡已使用')
        // alert('此优惠卡已使用')
     }else if(this.Cards_res.status==20){
       console.log('id2=============='+this.userid)
       this.addCard()
        
     }else if(this.Cards_res.stutas==50){
       this.addCard()
     }
      
  };


//添加优惠卡
addCard(){
    let dataParams = {
              "bean": {
              cardpwd:this.Cards_res.cardpwd,
              cardid:this.Cards_res.cardid,
              custuserid:this.userid,
              },
            }
             
        this.http.httpMethodContext(HttpUrl.addCards,dataParams, (res, context) =>{
          console.log('id=============='+this.userid)
          context.stader=res.retcode;
          // 535458451141
          // console.log('untis==='+JSON.stringify(this.stader))
          if(res.retcode==0){
            showToast('添加成功')
            console.log(res.success)
          }else if(res.retcode==-1){
            showToast('添加失败')
          }else{
            alert(res.retinfo)
            showToast(res.retinfo)
          }
          // console.log('客户优惠券==========='+JSON.stringify(res));
        },this)
}


  Trues(){
      if(this.navParams.data.storeInfo==undefined){
        showToast('此卡为无效卡');
        this.navCtrl.pop();
        globalVar.govoucher=false;
      }else{
        this.poarfnin();
        this.navCtrl.pop();
        globalVar.govoucher=false;//为false时  pop之后push 优惠券页面，在首页govoucherPage()执行
      };
      globalVar.isbubble=false;
  };
  Falses(){
     this.navCtrl.pop();
    console.log(666)
  }
}




// switch (localStorage.getItem(this.Cards_res.status)) {
// 	      case '10':
//            showToast('此卡暂未激活')
//           alert('此卡暂未激活')
// 	        break;
//         case '20':
//           this.addCard()
//           break;  
//         case '30':
//           showToast('已添加此优惠卡')
//           alert('已添加此优惠卡') 
//           break; 
//         case '40': 
//           showToast('此优惠卡已使用')
//           alert('已添加此优惠卡')
//           break;
//         default:
//           this.addCard()
//           break;    
//       }   