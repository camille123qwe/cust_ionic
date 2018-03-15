import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ImagePicker } from '@ionic-native/image-picker';
import { AlertController, App } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpContents, showToast, constVar, globalVar } from '../common/global';
import { LoginPage } from '../pages/login/login';
import { HttpGet } from './http-get';

@Injectable()
export class GlobalProvider {

  constructor(private toastCtrl: ToastController,public http: Http,public imagePicker: ImagePicker,private fileTransfer:FileTransfer) {}
  presentToast(mag) {
    let toast = this.toastCtrl.create({
      message: mag,
      duration: 2000,
      position: 'middle',
      cssClass:'myToastStr'
    });
    toast.present();
  }
    getAlbumImages(count, width, height, quality, outputType): Promise<any> {
    let context = this;
    let options = {
      maximumImagesCount: count,
      width: width,
      height: height,
      quality: quality,
      outputType: outputType
    }
    console.log("options==" + JSON.stringify(options));
    return context.imagePicker.getPictures(options);
  }
    uploadPhotos(paths, url, callback) {

    let successResponseArray = [];
    let options: any;
    let count = 0;
    options = {
      fileName: '',
      headers: { 'App-Agent': HttpContents.app_agent }
    }

    if (typeof paths != 'undefined' && paths != null && paths.length > 0) {
      unploadOneFile(paths[0], callback);
    } else {
      console.log('paths error');
      showToast("图片上传失败！");
    }
     function unploadOneFile(file_path, callback) {
      options.fileName = new Date().getTime() + '.jpg';
      this.fileTransfer.upload(file_path, url, options)
        .then((data) => {
          console.log('upload result==' + JSON.stringify(data));
          // "upload result=={"bytesSent":62052,"responseCode":200,"response":"{\"success\":true,\"retcode\":0,\"fileid\":\"0pguerkrck75kfsgcg7m6alqh7.jpg\",\"filename\":\"1496202407735.jpg\",\"filelength\":61940}", "objectId":"" } ", source: file:///android_asset/www/build/main.js (25923)


          let res = JSON.parse(data.response);
          if (res.success) {
            console.log("第" + (count + 1) + "张图片上传成功！");
            // showToast("第" + (count + 1) + "张图片上传成功！");
            successResponseArray.push(res);

            if (count == paths.length - 1) {
              console.log("所有图片上传完成！");
              // showToast("图片上传完成！");
              callback(successResponseArray);
            } else {
              count++;
              unploadOneFile(paths[count], callback);
            }

          } else {
            showToast(res.retinfo);

          }
        }, (err) => {
          // error
          console.log('upload error');
          showToast("图片上传失败！");
        })
    }

  }
}
