import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform,ActionSheetController} from 'ionic-angular';
import { BeautyPhotosPage } from '../../pages/beauty-photos/beauty-photos'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
declare var cordova:any;
declare var file:any;


@Component({
  selector: 'page-side-photo',
  templateUrl: 'side-photo.html',
})
export class SidePhotoPage { 
  IMG;
  val;
  IMGs = [];
  IMGs_p=[];
  IMG_index;
  IMGp_index;
  leg=true;
  pru=true;
  imgId;
  imgUrl;
  replaces=true;
  showImgUrl;




  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,public actionSheetCtrl: ActionSheetController,
  private transfer:FileTransfer) {
    this.IMG = this.navParams.data.keyo;
    this.IMGs = this.navParams.data.keyt;
    this.IMGs_p = this.navParams.data.keyp;
    this.val= this.navParams.data.Val;
    console.log(this.val)
    if(this.val==1){
      this.leg=false;
      this.pru=true;
        for (let i in this.IMGs) {

          if (this.IMG == this.IMGs[i]) {

            this.IMG_index = i;

            this.showImgUrl = this.IMGs[this.IMG_index].bigimg;
            
            this.imgId=this.IMGs[this.IMG_index].girlid+".jpg";

            console.log(this.imgId);
          }
        }
    }else{
        this.leg=true;
        this.pru=false;
         console.log(555)

        for (let j in this.IMGs_p) {

          console.log(6666)

          if (this.IMG == this.IMGs_p[j]) {

            this.IMGp_index =j;

          }
        }
    }
 
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SidePhotoPage');
    
    if(this.platform.is('android')){
           this.imgUrl='';
           this.imgUrl=cordova.file.externalRootDirectory+"/DCIM/Camera/";//externalDataDirectory; //;//applicationStorageDirectory(<any>window).
    }else{
      this.imgUrl='';
      this.imgUrl='/var/mobile/Containers/Data/Application/9153D934-E9DA-4DA0-8498-540651B06D07/Documents';//invite_qrcode.png
    } 

  }

  Back() {
    this.navCtrl.pop();
  }



 

  //保存图片美女方法
  localPreservation(showImgUrl,imgUrl,imgId){
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(showImgUrl, imgUrl+imgId).then((entry) => {
            console.log("成功下载"+entry.toURL())
          }, (error) => {
            console.log(error)
          });
  }

   saveImg(showImgUrl,imgUrl,imgId){
     let actionSheet = this.actionSheetCtrl.create({
      title: '图片保存',
      buttons: [
        {
          text: '保存到相册',
          // cssClass: 'my_sheet_btn',
          handler: () => {
            console.log('从相册选择');
            this.localPreservation(showImgUrl,imgUrl,imgId);

          }
        }, {
          text: '取消保存',
          // cssClass: 'my_sheet_btn',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }





}
