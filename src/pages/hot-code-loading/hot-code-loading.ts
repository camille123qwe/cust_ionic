import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { goLogin, isLogin, globalVar } from '../../common/global';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { WelcomePage } from '../welcome/welcome';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-hot-code-loading',
  templateUrl: 'hot-code-loading.html',
})
export class HotCodeLoadingPage {

  nextPage;
  percent = 5;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,private statusBar:StatusBar) {

    if (globalVar.openHotPush) {
      this.initHotCodePush(this);
    }

  }
  ionViewDidLeave() {
    this.statusBar.show();
  }

  ionViewDidLoad() {
    let time = 1000;
    if (globalVar.openHotPush) {
      this.initHotCodePush(this);
      time = 10000;
    }

    let context = this;
    console.log('ionViewDidLoad HotCodeLoadingPage');
    setTimeout(function () {
      context.stoped();
    }, time);

    let width = 5;
    let interval = setInterval(function () {
      if (width < 98 && context.percent < 100) {
        width = width + 2;
        context.percent = width;
        document.getElementById('process-bar-percent').style.width = width + '%';
      } else {
        clearInterval(interval);
      }

    }, 300);
  }

  stoped() {
    this.percent = 100;
    document.getElementById('process-bar-percent').style.width = 100 + '%';
    if (globalVar.welcomeImgs.length > 0) {
      this.app.getRootNav().setRoot(WelcomePage);
    } else {
      console.log(666)
      // this.app.getRootNav().setRoot(TabsPage);
      if (!isLogin() && localStorage.getItem('skipLogin') != 'true') {
        this.app.getRootNav().setRoot(LoginPage);
      } else {
        this.app.getRootNav().setRoot(TabsPage);
      }
    }
  }
  initHotCodePush(context) {

    var hotCodeApp = {

      // Application Constructor
      initialize: function () {
        hotCodeApp.bindEvents();
      },

      // Bind any events that are required.
      // Usually you should subscribe on 'deviceready' event to know, when you can start calling cordova modules
      bindEvents: function () {
        document.addEventListener('deviceready', hotCodeApp.onDeviceReady, false);
        document.addEventListener('chcp_updateLoadFailed', hotCodeApp.onUpdateLoadError, false);
        // document.addEventListener('chcp_updateIsReadyToInstall', hotCodeApp.onUpdateReady, false);
        document.addEventListener('chcp_nothingToUpdate',
          () => {
            console.log('chcp_nothingToUpdate 热更新step-1:无可用热更新！');
            context.stoped();

          }, false);
        document.addEventListener('chcp_updateInstallFailed',
          () => {
            console.log('chcp_updateInstallFailed');
            context.stoped();

          }, false);
        // document.addEventListener('chcp_nothingToInstall', () => { console.log('chcp_nothingToInstall') }, false);
        // document.addEventListener('chcp_assetsInstallationError', () => { console.log('chcp_assetsInstallationError') }, false);
        document.addEventListener('chcp_updateInstalled',
          () => {
            console.log('chcp_updateInstalled 热更新step4:热更新完成');

            context.stoped();

          }
          , false);
      },
      checkForUpdate: function () {
        console.log('热更新step0:检查是否有更新');
        (<any>window).chcp.fetchUpdate(hotCodeApp.fetchUpdateCallback);
      },
      fetchUpdateCallback: function (error, data) {
        if (error) {
          console.log('chcp==Failed to load the update with error code: ' + error.code);
          console.log(error.description);

          return;
        }

        console.log('chcp==Update is loaded, running the installation 热更新step1:更新已下载！');

        (<any>window).chcp.installUpdate(hotCodeApp.installationCallback);
      },
      // chcp_updateIsReadyToInstall Event Handler
      onUpdateReady: function () {
        console.log('chcp== Update is ready for installation 热更新step2:可供安装');
      },
      installationCallback: function (error) {
        if (error) {
          console.log('chcp==Failed to install the update with error code: ' + error.code);
          console.log(error.description);
        } else {
          console.log('chcp==Update installed! 热更新step3:更新安装完成');

        }
      },
      // deviceready Event Handler
      onDeviceReady: function () {
        // change plugin options
        // app.configurePlugin();
        hotCodeApp.checkForUpdate();

      },

      onUpdateLoadError: function (eventData) {
        let error = eventData.detail.error;
        if (error && error.code == (<any>window).chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
          console.log('chcp== Native side update required');
          let dialogMessage = 'New version of the application is available on the store. Please, update.';
          (<any>window).chcp.requestApplicationUpdate(dialogMessage, this.userWentToStoreCallback, this.userDeclinedRedirectCallback);
        }

        context.stoped();

      },

      userWentToStoreCallback: function () {
        // user went to the store from the dialog
      },

      userDeclinedRedirectCallback: function () {
        // User didn't want to leave the app.
        // Maybe he will update later.
      },
      configurePlugin: function () {
        let options = {
          'config-file': "http://b.diancall.com/app/frontcore/www/chcp.json"
        };

        (<any>window).chcp.configure(options, hotCodeApp.configureCallback);
      },

      configureCallback: function (error) {
        if (error) {
          console.log('chcp==Error during the configuration process');
          console.log(error.description);
        } else {
          console.log('chcp==Plugin configured successfully');
          hotCodeApp.checkForUpdate();
        }
      },


    };

    hotCodeApp.initialize();
  }


}
