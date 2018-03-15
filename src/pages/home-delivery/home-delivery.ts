import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { TestHelloComponent } from '../../components/test-hello/test-hello';

/**
 * Generated class for the HomeDeliveryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home-delivery',
  templateUrl: 'home-delivery.html',
})
export class HomeDeliveryPage {
  categories = [1, 2, 3, 4, 5, 6, 7];
  guessLikeShops = [1, 2, 3,]
  shousuo_img = 'assets/img/wodemendian_shousuo@2x.png';
  banner='assets/img/songhuo_banner@2x.png';
  // categories: Array<any> = [];
  selectedMenuTarget: any;
  hasmore = true;

  islock = false;

  params = {
    favoritesId: 0,
    pageNo: 1
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeDeliveryPage');
  }
  menu(item) {
    console.log(item)
    switch (item) {
      case 1:
        this.guessLikeShops = [1, 2, 3, ]
        break;
      case 2:
        this.guessLikeShops = [1, 2]
        break;
      case 3:
        this.guessLikeShops = [1, 2, 3]
        break;
      case 4:
        this.guessLikeShops = [1]
        break;
      case 5:
        this.guessLikeShops = [1, 2, 3, 4,5]
        break;
      case 6:
        this.guessLikeShops = [1, 2, 3, 4]
        break;
      case 7:
        this.guessLikeShops = [1, 2, 3, 4,5,6,7]
        break;
    }
  }
  itemClick(c, event) {

    var initSelected: any = document.getElementsByClassName('menuItem');
    if (initSelected[0].classList.contains("active")) {
      initSelected[0].classList.remove("active")
    }


    //移除上次选中菜单的样式
    if (this.selectedMenuTarget) {
      this.selectedMenuTarget.classList.remove("active")
    }

    //修改本次选中菜单的样式
    event.currentTarget.classList.add("active");

    //将本次选中的菜单记录
    this.selectedMenuTarget = event.currentTarget;

    this.hasmore = true;

    this.params.favoritesId = c.FavoritesId;
    this.params.pageNo = 1;

    // this.getProducts();
  }

  getShopDetails(){
    this.navCtrl.push('HomeDeliveryDetailPage')
  }


}
