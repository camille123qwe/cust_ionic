import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content ,ModalController } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { SidePhotoPage} from '../../pages/side-photo/side-photo'
@Component({
  selector: 'page-beauty-photos',
  templateUrl: 'beauty-photos.html'
})
export class BeautyPhotosPage {
  tab1_class;
  tab2_class;
  type: string;
  girls_type: number = 10;
v=[];
c=[];
n=[];
m=[];
legs_list_l = [];
legs_list_r = [];
pure_list_l = [];
pure_list_r = [];
legs_Img = [];
pure_Img = [];
  @ViewChild(Content) content: Content;
  last_createtime = 0;  //加載更多的時間戳


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet,public modalCtrl: ModalController,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeautyPhotosPage');
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.type = 'left';
    this.getPhotos();
  }
  getPhotos() {
    let dataParams = {
      bean: {
        type: this.girls_type,
        createtime: this.last_createtime
      },
      flipper: {
        // limit: 10,
        // offset: 10,
      }
    }
    this.http.httpMethodContext(HttpUrl.beautyPhotos, dataParams, this.onSuccess, this);
  }
  onSuccess(res, context) {
    // {"rows":[{"bigimg":"https://hbimg.b0.upaiyun.com/a4744fffef206caa0658c73404c32b8a08f4b50c3882a-Ui1hrU_fw658","girlid":"a4744fffef206caa0658c73404c32b8a08f4b50c3882a-Ui1hrU","smallimg":"https://hbimg.b0.upaiyun.com/a4744fffef206caa0658c73404c32b8a08f4b50c3882a-Ui1hrU_fw320","type":10},
    // this.legs_list = res.rows;
    context.format(res.rows);
  }
  format(rows) {
  	 if (this.girls_type == 10) {
      //长腿
      if (this.last_createtime === 0) {
        
        this.v = rows;
        this.legs_Img=rows;
        for(let i=0;i<this.v.length;i++){
          if(i%2==0){
            this.legs_list_l.push(this.v[i])
          }else{
            this.legs_list_r.push(this.v[i])
          }
        }
        // console.log('......................'+this.v.length)
      } else {
         this.c=[];
        for (let item of rows) {
         
          this.c.push(item);
          this.legs_Img.push(item);
          // console.log('______________________'+this.c.length)
        }
        for(let j=0;j<this.c.length;j++){
            if(j%2==0){
              this.legs_list_l.push(this.c[j])
            }else{
              this.legs_list_r.push(this.c[j])
            }
          }
      }
    } 
    else {
      //清纯
      if (this.last_createtime === 0) {
         this.n = rows;
         this.pure_Img=rows;
        for(let i=0;i<this.n.length;i++){
          if(i%2==0){
            this.pure_list_l.push(this.n[i])
          }else{
            this.pure_list_r.push(this.n[i])
          }
        }
      } else {
        this.m=[];
        for (let item of rows) {
          this.m.push(item);
          this.pure_Img.push(item);
        }
        for(let j=0;j<this.m.length;j++){
            if(j%2==0){
              this.pure_list_l.push(this.m[j])
            }else{
              this.pure_list_r.push(this.m[j])
            }
        }
      }
    }
   
    this.last_createtime = rows[rows.length - 1].createtime;
    console.log('last_createtime==' + this.last_createtime);

  }

  //轮播图页面
  SidesL(beauty){
    let modal=this.modalCtrl.create(SidePhotoPage,{keyo:beauty,keyt:this.legs_Img,Val:1});
        modal.present();
  }

  SidesP(beauty){
    let modal=this.modalCtrl.create(SidePhotoPage,{keyo:beauty,keyp:this.pure_Img,Val:2});
        modal.present();
  }



  selectedLeft() {
    this.type = 'left';
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.girls_type = 20;
    this.getPhotos();
    // this.content.scrollTo(0, 0, 200);
    this.last_createtime = 0;

  }
  selectedRight() {
    this.type = 'right';
    this.tab1_class = "text-off";
    this.tab2_class = "text-actived";
    this.girls_type = 20;
    this.getPhotos();
    // this.content.scrollTo(0, 0, 200);
    this.last_createtime = 0;

  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('加载更多');
      this.getPhotos();
      infiniteScroll.complete();

    }, 200);
  }
}
