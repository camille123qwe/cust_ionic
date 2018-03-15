import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, HttpContents, constVar, globalVar } from '../../common/global';


@Component({
  selector: 'page-my-flows',
  templateUrl: 'my-flows.html'
})
export class MyFlowsPage {
	myFlow=[];
  ros=true;
  constructor(private navCtrl: NavController, private http: HttpGet, private navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFlowsPage');
    
  }
  
  ionViewDidEnter(){
  	console.log('ionViewDidLoad MyFlowsPage');
	this.MyFlows();
  }
  
MyFlows() {
	
	

    this.http.httpMethodContext(HttpUrl.myFlows, {}, (res, context) => {
//  	console.log(res);


       if(res.rows.length==undefined){
         context.myFlow=res.rows.reverse();
       }else{
          context.myFlow=res.rows.reverse();
          for(let item of context.myFlow){
            let newDate1: any = new Date();
            newDate1.setTime(item.createtime);
            item.createtime = newDate1.format('yyyy-MM-dd hh:mm');
            item.fluxkbs = Math.ceil(item.fluxkbs / 1024) + 'M';

          }
       }
     	 
       if(res.total==-1){
          this.ros=false
       }else{
         this.ros=true;
       }

      
			console.log('hhhh==' + JSON.stringify(res))
    }, this);

}
   

}
