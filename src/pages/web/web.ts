import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'page-web',
  templateUrl: 'web.html'
})
export class WebPage {
  title: string;
  srcUrl: any;
  @ViewChild('target') target: ElementRef;
  element: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer, private renderer: Renderer, element: ElementRef) {
    this.element = element;
  }
  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get('url'));
    console.log('url=' + this.srcUrl.toString());
    console.log('title=' + this.title);


    console.log('indexOf==' + this.srcUrl.toString().indexOf('mini.eastday.com'));
    if (this.srcUrl.toString().indexOf('mini.eastday.com') >= 0) {
      this.stopGoAnathor();
    }


  }

  stopGoAnathor() {
    let iframe = <HTMLIFrameElement>document.getElementById("web_iframe");
    let i = 10;
    let len = 0;
    let arr = iframe.contentWindow.document.getElementsByTagName('a');
    iframe.onload = function () {
      arr = iframe.contentWindow.document.getElementsByTagName('a');
      for (let i = len; i < arr.length; i++) {
        arr[i].href = 'javascript:void(0);';
      }
      len = arr.length - 1;
      waitForOnLoad(iframe);
    }

    function waitForOnLoad(iframe) {
      setTimeout(function () {
        arr = iframe.contentWindow.document.getElementsByTagName('a');
        for (let i = len; i < arr.length; i++) {
          arr[i].href = 'javascript:void(0);';
        }
        i--;
        if (i > 0) {
          len = arr.length - 1;
          waitForOnLoad(iframe);
        }
      }, 2000);
    }
  }






}
