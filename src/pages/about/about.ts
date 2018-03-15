import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public alertCtrl:AlertController) {

  }
  /*基本的Alerts是一个典型的提示用户一些信息的通知框（如App的更新，一个新特性等等），
   或一个重要情况需要用户确认，或作为用户操作是否成功的一个提示。*/
  showAlert(){
    let alert = this.alertCtrl.create({
      title:"warning",
      subTitle:"are you sure",
      buttons:['ok']
    });
    alert.present();
  }
  /*
   * Prompt Alerts提供了一种方式来输入数据或信息。一般情况下这种弹出框被用来要求用户在进行下一步操作之前输入密码。*/
  showPrompt(){
      let prompt = this.alertCtrl.create({
        title:"login",
        message:"do you want to login",
        inputs:[{
          name:"title",
          placeholder:"Title"
        }],
        buttons:[
          {
            text: "Cancel",
            handler: data=> {
              console.log("cancel clicked");
            },
          },
          {
            text:"save",
            handler:data=>{
              console.log("save clciked");
            }
          }
        ]
      });
    prompt.present();
  }
  /*Confirmation Alerts被用在需要用户在进行下一步操作之前确认选择的时候。一个例子是当用户要从联系人删除一个人的时候需要用户确认删除操作。*/
  confirmAlert(){
    let confirm = this.alertCtrl.create({
        title:"delete the message?",
        message:"do you agree to delete the message?",
        buttons:[
          {
            text:"disagree",
            handler:()=>{
              console.log("disagree clicked");
            }
          },
          {
            text:"agree",
            handler:()=>{
              console.log("agree clicked");
            }
          }
        ]
    });
    confirm.present();
  }
  /*
  * Radio Alerts
   Radio Alerts是一种确认消息框，使用Radio组件来提供几个选择项，但用户只能选择其中一个选项。*/
  radioAlert(){
    let radio = this.alertCtrl.create();
    radio.setTitle("lightsaber color");
    radio.addInput(
      {
        type:"radio",
        label:"blue",
        value:"bblluuee",
        checked:false
      }
    );
    radio.addInput({
      type:"radio",
      label:"red",
      value:"rreedd",
      checked:true
    });
    radio.addButton("Cancel");
    radio.addButton({
      text:"ok",
      handler:()=>{
        console.log('radio clicked');
      }
    });
    radio.present();
  }
 /* Checkbox Alerts
  Checkbox Alerts是一种确认消息框，使用Checkbox组件提供选择项，用户可以选择多个。*/
  checkboxAlert(){
    let check = this.alertCtrl.create();
    check.setTitle("just choose what you want");
    check.addInput({
      type:"checkbox",
      label:"yoga",
      value:"yogavalue",
      checked:true
    });
    check.addInput({
      type:"checkbox",
      label:"swim",
      value:"swimvalue",
      checked:false
    });
    check.addButton("cancel");
    check.addButton({
      text:"ok",
      handler:()=>{
        console.log("checkbox.ok");
      }
    });
    check.present();
  }
}
