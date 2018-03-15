import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler,IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { FindPage } from '../pages/find/find';
import { TabsPage } from '../pages/tabs/tabs';
import { CallPage } from '../pages/call/call';
import { WebPage } from '../pages/web/web';
import { PointsExchangePage } from '../pages/PointsExchange/PointsExchange';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MyCardComponent } from '../components/my-card/my-card';
import { MessagesPage } from '../pages/messages/messages';
import { HttpGet } from '../providers/http-get';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { JSONP_PROVIDERS } from 'angular2/http';
import { bootstrap } from 'angular2/platform/browser';
import { ConnectYZX } from '../providers/connect-yzx';
import { TelephonePage } from '../pages/call-modal/call-modal';
import { MePage } from '../pages/me/me';
import { KeyboardPage } from '../pages/keyboard/keyboard';
import { OrderBy } from '../pipes/order-by';
import { CallProvider } from '../providers/call-provider';
import { ParkPage } from '../pages/park/park';
import { PointsMallPage } from '../pages/points-mall/points-mall';
import { GlobalProvider } from '../providers/global-provider';
import { MyFlowsPage } from '../pages/my-flows/my-flows';
import { MyVoucherPage } from '../pages/my-voucher/my-voucher';
import { MyShopPage } from '../pages/my-shop/my-shop';
import { MyPointsPage } from '../pages/my-points/my-points';
import { MyAccountPage } from '../pages/my-account/my-account';
import { InvitePage } from '../pages/invite/invite';
import { SettingPage } from '../pages/setting/setting';
import { PointsDetailsPage } from '../pages/points-details/points-details';
import { ExchangeRecordPage } from '../pages/exchange-record/exchange-record';
import { ChangePhonePage } from '../pages/change-phone/change-phone';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { AboutDianCallPage } from '../pages/about-dian-call/about-dian-call';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { CallSettingPage } from '../pages/call-setting/call-setting';
import { ShopDetailsPage } from '../pages/shop-details/shop-details';
import { ShopSettingPage } from '../pages/shop-setting/shop-setting';
import { CitySelectionPage } from '../pages/city-selection/city-selection';
import { BeautyPhotosPage } from '../pages/beauty-photos/beauty-photos';
import { NewsPage } from '../pages/news/news';
import { SearchShopPage } from '../pages/search-shop/search-shop';
import { JokePage } from '../pages/joke/joke';
import { GamePage } from '../pages/game/game';
import { CallbackPage } from '../pages/callback/callback';
import { StreamingPage } from '../pages/streaming/streaming';
import { SidePhotoPage } from '../pages/side-photo/side-photo';
import { ShopParticularsPage } from '../pages/shop-particulars/shop-particulars';
import { PreferentialModulePage } from '../pages/preferential-module/preferential-module';
import { PrivilegeModaldulePage } from '../pages/privilege-modaldule/privilege-modaldule';
import { CardSettingPage } from '../pages/card-setting/card-setting';
import { GoodsManagePage } from '../pages/goods-manage/goods-manage';
import { HttpModule } from '@angular/http';
import { FlowsChargePage } from '../pages/flows-charge/flows-charge';
import { FlowsGivePage } from '../pages/flows-give/flows-give';
import { ChargeSuccessPage } from "../pages/charge-success/charge-success";
import { AboutPage } from '../pages/about/about';
import { GiveflowsSuccess } from '../pages/giveflows-success/giveflows-success';
import { xianShiYouHuiPage } from '../pages/xianshiyouhui/xianshiyouhui';
import { xianShiShopPage } from '../pages/xianshishop/xianshishop';
import { provisionAlertPage } from '../pages/provision-alert/provision-alert';
import { timeLimitAlertPage } from '../pages/time-limit-alert/time-limit-alert';
import { WelcomePage } from '../pages/welcome/welcome';
import { ZhaopinListPage } from '../pages/zhaopin-list/zhaopin-list';
import { ZhaopinDetailsPage } from '../pages/zhaopin-details/zhaopin-details';
import { HotCodeLoadingPage } from '../pages/hot-code-loading/hot-code-loading';
import { CityPickerDemoPage } from "../pages/city-picker-demo/city-picker-demo";
import { CityPickerModule } from  "ionic2-city-picker"
import {  CityPickerProvider } from '../providers/city-picker/city-picker';
import { ImagePicker } from '@ionic-native/image-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { TestHelloComponent } from '../components/test-hello/test-hello';


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    FindPage,
    CallPage,
    TabsPage,
    WebPage,
    PointsExchangePage,
    LoginPage,
    RegisterPage,
    MyCardComponent,
    MessagesPage,
    TelephonePage,
    MePage,
    KeyboardPage,
    OrderBy,
    ParkPage,
    PointsMallPage,
    MyFlowsPage,
    MyVoucherPage,
    MyShopPage,
    MyPointsPage,
    MyAccountPage,
    InvitePage,
    SettingPage,
    PointsDetailsPage,
    ExchangeRecordPage,
    ChangePhonePage,
    ChangePasswordPage,
    SuggestionsPage,
    AboutDianCallPage,
    ForgetPasswordPage,
    CallSettingPage,
    ShopDetailsPage,
    ShopSettingPage,
    CitySelectionPage,
    BeautyPhotosPage,
    NewsPage,
    SearchShopPage,
    JokePage,
    GamePage,
    CallbackPage,
    StreamingPage,
    SidePhotoPage,
    ShopParticularsPage,
    PreferentialModulePage,
    PrivilegeModaldulePage,
    CardSettingPage,
    GoodsManagePage,
    FlowsChargePage,
    FlowsGivePage,
    ChargeSuccessPage,
    AboutPage,
    GiveflowsSuccess,
    xianShiYouHuiPage,
    xianShiShopPage,
    provisionAlertPage,
    timeLimitAlertPage,
    WelcomePage,
    ZhaopinListPage,
    ZhaopinDetailsPage,HotCodeLoadingPage,
    CityPickerDemoPage
    // TestHelloComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      iconMode: 'ios',
      tabsHideOnSubPages: 'true',
      mode: 'ios',
    }),
    JsonpModule,
    BrowserModule,
    HttpModule,
    CityPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    FindPage,
    CallPage,
    TabsPage,
    WebPage,
    PointsExchangePage,
    LoginPage,
    RegisterPage,
    MessagesPage,
    TelephonePage,
    MePage,
    KeyboardPage,
    ParkPage,
    PointsMallPage,
    MyFlowsPage,
    MyVoucherPage,
    MyShopPage,
    MyPointsPage,
    MyAccountPage,
    InvitePage,
    SettingPage,
    PointsDetailsPage,
    ExchangeRecordPage,
    ChangePhonePage,
    ChangePasswordPage,
    SuggestionsPage,
    AboutDianCallPage,
    ForgetPasswordPage,
    CallSettingPage,
    ShopDetailsPage,
    ShopSettingPage,
    CitySelectionPage,
    BeautyPhotosPage,
    NewsPage,
    SearchShopPage,
    JokePage,
    GamePage,
    CallbackPage,
    StreamingPage,
    SidePhotoPage,
    ShopParticularsPage,
    PreferentialModulePage,
    PrivilegeModaldulePage,
    CardSettingPage,
    GoodsManagePage,
    FlowsChargePage,
    FlowsGivePage,
    ChargeSuccessPage,
    AboutPage,
    GiveflowsSuccess,
    xianShiYouHuiPage,
    xianShiShopPage,
    provisionAlertPage,
    timeLimitAlertPage,
    WelcomePage,
    ZhaopinListPage,
    ZhaopinDetailsPage,HotCodeLoadingPage,
    CityPickerDemoPage

  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, HttpGet, CallProvider, GlobalProvider,StatusBar,SplashScreen,
    Camera,FileTransfer, FileTransferObject,InAppBrowser,
    CityPickerProvider,ImagePicker]
  
})
export class AppModule { }
