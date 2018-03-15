import { Component, ViewChild, ElementRef ,ChangeDetectorRef} from '@angular/core';
import { NavController, PopoverController ,ModalController} from 'ionic-angular';
import { KeyboardPage } from '../keyboard/keyboard';
import { CallProvider } from '../../providers/call-provider';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, isLogin, goLogin,globalVar } from '../../common/global';
import { CallbackPage } from '../callback/callback';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-call',
  templateUrl: 'call.html'
})
export class CallPage {
  @ViewChild('btn-keyboard') btnKeyboard: ElementRef;
  allRecords;
  num;
	phone;
  usable_min;
  isLogin: boolean = true;
	pVal= false;
  
  constructor(public cd: ChangeDetectorRef,public navCtrl: NavController, public popoverCtrl: PopoverController, public call: CallProvider, private http: HttpGet,public modalCtrl: ModalController,) {
    console.log('call constructor');
    this.allRecords = call.initRecords();
   
    CallProvider.phoneNumberService = '';  //清除拨号

    if (isLogin()) {
      this.isLogin = true;
      this.http.httpMethodContext(HttpUrl.voiceTime, {}, (res, context) => {
        context.usable_min = Math.ceil(res.result / 60);
      }, this);
    } else {
      this.isLogin = false;
    }
    

  }

  ionViewDidLoad() {
    console.log('call ionViewDidLoad');
    // this.usable_min = globalVar.call_time;
  
  }
  ionViewDidEnter(){
    console.log('lllllllllll==ionViewDidLoad');
    
  }

  
  
  calling(item) {
    
    if (!goLogin(this,true)) {
      return;
    }
//console.log(item)
		if(localStorage.getItem('call_type')=='call_back' && item.phoneNumber !== '' && item.phoneNumber.length>=7 && item.phoneNumber.length<=15){
    	this.navCtrl.push(CallbackPage,item);
       this.cd.detectChanges();
    }
    this.call.callSomebody(item);
  }
  

  login() {
    // let myModal = this.modalCtrl.create(LoginPage);
    // myModal.present();
    goLogin(this,true);
  }
  
  
}
