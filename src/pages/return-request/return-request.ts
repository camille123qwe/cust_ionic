import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ActionSheetController, LoadingController,App,IonicPage} from 'ionic-angular';
import { GlobalProvider } from '../../providers/global-provider';
import { HttpContents, showToast, saveLoginInfo, HttpUrl, constVar, globalVar } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { Camera } from '@ionic-native/camera';
import { SidePhotoPage } from '../../pages/side-photo/side-photo';
import { DeliveryPage } from '../../pages/delivery/delivery';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the ReturnRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-return-request',
  templateUrl: 'return-request.html',
})
export class ReturnRequestPage {

    undeliveryItem = {storename:'军昆数码商店',account:15,kind:3,time:{starttime:20170809,endtime:20170908}};
   storename:string = "军昆数码商店";
   undeiliveryGoods = {rows:[]};
  paizhao = true;
  xuanzetupian = false;
  goodsPictures = [];
  add_png = 'assets/img/icon_tianjiatupian@2x.png';
   rows_goods = [[this.add_png,], []];
  max_photos_count = 5;
  loading;
  isLoading = false;
   storefacefileid = '';
  storeimgfileid = [];
  PostImg = false;
  order_id:string;
  expressname = '';
  expressno='';
  constructor(public alertCtrl: AlertController, private http: HttpGet, public navCtrl: NavController, private actionSheetCtrl: ActionSheetController,
    public cd: ChangeDetectorRef, public navParams: NavParams, public globalProvider: GlobalProvider, public modalCtrl: ModalController, public app:App,
    private loadingCtrl: LoadingController,private camera:Camera) {
      this.order_id = this.navParams.get('id');
      this.initData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Shipping');
  }
  initData(){
  }

  changePictures(item) {
    if (this.goodsPictures.indexOf(item) < 0) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '选择图片',
        buttons: [
          {
            text: '从相册选择',
            cssClass: 'my_sheet_btn',
            handler: () => {
              console.log('从相册选择');
              this.pickPictures();
            }
          }, {
            text: '拍照',
            cssClass: 'my_sheet_btn',
            handler: () => {
              console.log('拍照');
              this.getCameraImage();
            }
          }, {
            text: '取消',
            cssClass: 'my_sheet_btn',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();

    } else {
      console.log('delete');
      this.previewPictures(item);
    }
    this.xuanzetupian = true;
    this.paizhao = false;
  }

  getCameraImage() {
    let options = {
      quality: 70,
      destinationType: 1,
      targetHeight: 512,
      saveToPhotoAlbum: true,
      cameraDirection: 1,
    }
    console.log("options==" + JSON.stringify(options));
    let context = this;
    this.camera.getPicture(options).then((imageData) => {
      console.log('Image URI==' + imageData);
      let arr = [imageData];
      if (typeof arr == 'undefined' || arr.length == 0) {
        console.log('未选择图片');
      } else {
        context.addToArray(arr);
      }
    }, (err) => {
      // Handle error
    });
  }
  pickPictures() {
    let context = this;
    let can_pick = this.max_photos_count - this.goodsPictures.length;
    this.globalProvider.getAlbumImages(can_pick, 900, 540, 75, 0).then(function (results) {
      console.log('imagePicker_result::' + results);
      if (typeof results == 'undefined' || results.length == 0) {
        console.log('未选择图片');
      } else {
        context.addToArray(results);
      }
    }, (err) => { console.log('获取图片失败') });
  }

  addToArray(results) {
    for (let item of results) {
      this.goodsPictures.push(item);
    }
    console.log('this.goodsPictures==' + this.goodsPictures);
    this.addToShowArray();
  }

  addToShowArray() {
    this.rows_goods = [[], []];
    for (let i = 0; i < this.goodsPictures.length; i++) {
      if (i < 4) {
        //第一排
        this.rows_goods[0][i] = this.goodsPictures[i];
      } else {
        //第二排
        this.rows_goods[1][i - 4] = this.goodsPictures[i];
      }
    }
    if (this.goodsPictures.length < 4) {
      this.rows_goods[0].push(this.add_png);
    } else {
      //第二排
      if (this.goodsPictures.length == 4) {
        this.rows_goods[1].push(this.add_png);
      }
    }
  }

  previewPictures(item) {
    let modal = this.modalCtrl.create(SidePhotoPage, { currentImg: item, allImgs: this.goodsPictures }, { showBackdrop: false, enableBackdropDismiss: false });
    modal.onDidDismiss((data) => {
      console.log("onDidDismiss==" + JSON.stringify(data));
      this.goodsPictures = data.afterDelte;
      this.addToShowArray();
    });
    modal.present();

  }
   upload() {
    if (this.goodsPictures.length == 0) {
      console.log('请先选择上传图片');
      showToast('请先选择上传图片');
      return;
    }
    console.log('uploadPhotos()');

    this.isLoading = true;
    this.loading = this.loadingCtrl.create({
      content: '上传数据中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.isLoading = false;
      this.loading.dismiss();
    }, 10000);

    console.log('goodsPictures==' + this.goodsPictures);
    // for (let item of this.goodsPictures) {
    
    //     this.storeimgfileid.push(item);
  
    // }
    if (this.goodsPictures.length > 0) {
      this.globalProvider.uploadPhotos(this.goodsPictures,"", (res) => {
        console.log('成功回调res==' + JSON.stringify(res));
        if (res.length == 0) {
          return;
        }

        for (let i = 0; i < res.length; i++) {
          this.storeimgfileid.push(res[i].fileid);
        }
        this.PostImg = true;
        this.xinzeng();
      });
    } else {
      this.PostImg = true;
      this.xinzeng();
    }
   }
    xinzeng() {
    if (this.expressname== '') {
      let alert = this.alertCtrl.create({
        title: '请输入物流商名称',
        buttons: ['确定'],
      })
      alert.present();
      return;
    } else if (this.expressno == '') {
      let alert = this.alertCtrl.create({
        title: '请输入物流单号',
        buttons: ['确定'],
      })
      alert.present();
      return;
    }  else if (!this.PostImg) {
      this.upload();
      console.log('上传图片');
    } else {
      let StoreimgFileid = this.storeimgfileid.join(";");
      let dataParams = {
      "bean": {
        expressname:this.expressname,
          expressno:this.expressno,
          logisticid:'',
          expressimg:StoreimgFileid,
          goodsorderid:this.order_id
      }
    }
    console.log(dataParams);
      console.log('图片已经上传过了');
       this.http.httpMethodContext(HttpUrl['deliverlogistic'], dataParams, (res, context) => {
     
      console.log(res);
      if (context.loading) {
        context.loading.dismiss();
      }
      context.isLoading = false;

      if (res.retcode == 0) {
         //this.app.getRootNav().push(DeliveryPage, {delivery:'delivery'});
         showToast('提交成功！');
         this.app.getRootNav().setRoot(TabsPage);
      } else {
        let alert = context.alertCtrl.create({
          title: res.retinfo,
          buttons: ['确定'],
        })
        alert.present();
      }

    }, this);
    }
    
  }
   chengong() {
    if (!this.PostImg) {
      console.log('上传图片');

      this.upload();
    } else {
      console.log('图片已经上传过了');
      this.xinzeng();
    }
    // this.initData();
  }

}
