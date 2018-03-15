import { Component, ViewChild, NgModule, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Tabs, PopoverController, List, Item } from 'ionic-angular';
import { KeyboardPage } from '../keyboard/keyboard';
import { CallPage } from '../call/call';
import { TabsPage } from '../tabs/tabs';
import { globalVar, goLogin, isLogin } from '../../common/global';
import { CallProvider } from '../../providers/call-provider';
import { CallSettingPage } from '../../pages/call-setting/call-setting';
import { CallbackPage } from '../callback/callback';

@Component({
  selector: 'page-call-modal',
  templateUrl: 'call-modal.html',
})

export class TelephonePage {
  @ViewChild('callTabs') tabCall: Tabs;
  // @ViewChild(CallPage) callPage: CallPage;

  callRoot: any = CallPage;
  // contactRoot: any = ContactPage;
  isKeyboardShow: boolean;
  contactShow: boolean;
  footer_keyboard: string;
  footer_contact: string;
  popover: any;
  calling_class = 'btn-calling';
  call_type: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public popoverCtrl: PopoverController, public call: CallProvider, public modalCtrl: ModalController, public cd: ChangeDetectorRef) {
    console.log('CallModalPage');
    this.isKeyboardShow = true;
    this.contactShow = false;
    this.footer_keyboard = "assets/svg/ryz-bohao.svg";
    this.footer_contact = "assets/svg/ryz-tongxunlu-outline.svg";

    // this.popover = this.popoverCtrl.create(KeyboardPage,{},{cssClass:'keyboard-backdrop'});
    if (isLogin()) {
      this.calling_class = 'btn-calling';
    } else {
      this.calling_class = 'btn-calling-unable';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallModalPage');
  }
  ionViewDidEnter() {
    console.log('lllllllllll==CallModalPage');

  }
  setting_page() {
    let myModal = this.modalCtrl.create(CallSettingPage);
    myModal.present();
  }


  calling() {
    if (!goLogin(this)) {
      return;
    }
    let contact = { phoneNumber: CallProvider.phoneNumberService, displayName: '' };
    if (localStorage.getItem('call_type') == 'call_back' && contact.phoneNumber !== '' && contact.phoneNumber.length >= 7 && contact.phoneNumber.length <= 15) {

      this.navCtrl.push(CallbackPage, contact);
    }
    // let call : CallProvider = new CallProvider();
    //	  console.log("calling==" + CallProvider.phoneNumberService);

    //隐藏键盘
    this.isKeyboardShow = false;
    this.call.callSomebody(contact);
    this.cd.detectChanges();


  }

  close() {
    this.viewCtrl.dismiss();
  }

  closeKeyboard() {
    // this.callPage.close();
  }
  goCallPage(myEvent) {

    //控制tab
    if (this.contactShow) {
      console.log('contactShow');
      this.footer_keyboard = "assets/svg/ryz-bohao.svg";
      this.footer_contact = "assets/svg/ryz-tongxunlu-outline.svg";
      this.contactShow = false;
      this.presentPopover(myEvent);
      this.isKeyboardShow = true;

    } else {
      console.log('contactShow not');
      //控制键盘
      if (this.isKeyboardShow) {
        console.log('isKeyboardShow');
        // this.popover.dismiss();
        this.isKeyboardShow = false;
      } else {
        console.log('isKeyboardShow not');
        this.presentPopover(myEvent);
        this.isKeyboardShow = true;
      }
    }



  }
  presentPopover(myEvent) {
    // this.popover = this.popoverCtrl.create(KeyboardPage, {}, { cssClass: 'keyboard-backdrop' });
    // this.popover.present({
    //   ev: myEvent
    // });

  }
  goContactsPage() {
    if (this.isKeyboardShow) {
      this.isKeyboardShow = false;
    }
    this.footer_keyboard = "assets/svg/ryz-bohao-outline.svg";
    this.footer_contact = "assets/svg/ryz-tongxunlu.svg";

    this.contactShow = true;
    this.isKeyboardShow = false;
  }
}