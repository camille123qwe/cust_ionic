import { IonicPage, NavController, NavParams, Platform,ActionSheetController,ViewController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { BeautyPhotosPage } from '../../pages/beauty-photos/beauty-photos'
import { Slides } from 'ionic-angular';

/**
 * Generated class for the SlideImgPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-slide-img',
  templateUrl: 'slide-img.html',
})
export class SlideImgPage {

   @ViewChild(Slides) slides: Slides;
  IMG;
  IMGs = [];
  IMG_index;
  title = "";
  imgUrl;
  showImgUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {
    this.IMG = this.navParams.data.currentImg;
    this.IMGs = this.navParams.data.allImgs;

    let current_index = this.IMGs.indexOf(this.IMG);
    if (current_index > 0) {
      this.IMG_index = current_index;
    } else {
      this.IMG_index = 0;
    }
    this.title = (this.IMG_index + 1) + "/" + this.IMGs.length;
  }
  slideChanged() {
    console.log('slideChanged()==' + this.slides.getActiveIndex());
    if (this.slides.getActiveIndex() == this.IMGs.length) {
      this.title = (this.slides.getActiveIndex() ) + "/" + this.IMGs.length;

    } else {
      this.title = (this.slides.getActiveIndex() + 1) + "/" + this.IMGs.length;
    }

  }
  deletePicture() {
    console.log('deletePicture()')
    let actionSheet = this.actionSheetCtrl.create({
      title: '确定删除此照片？',
      buttons: [
        {
          text: '删除',
          role: 'destructive',
          handler: () => {
            console.log('確定刪除此照片');
            this.IMGs.splice(this.slides.getActiveIndex(), 1);
            if (this.slides.isEnd()) {
              this.slides.slidePrev();
            }
            this.slides.update();
          }
        }, {
          text: '取消',
          // role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  dismiss() {
    let data = { afterDelte: this.IMGs };
    this.viewCtrl.dismiss(data);
    console.log("dismiss==" + JSON.stringify(data));

  }


}
