import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 import { IonicModule } from 'ionic-angular';

/**
 * Generated class for the AddShipaddrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-shipaddr',
  templateUrl: 'add-shipaddr.html',
})
export class AddShipaddrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShipaddrPage');
  }
      
}
