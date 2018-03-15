import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { globalVar } from '../../common/global';
import { CallProvider } from '../../providers/call-provider';


@Component({
	selector: 'page-keyboard',
	templateUrl: 'keyboard.html'
})
export class KeyboardPage {
	

	phone_number: string="";
	newphone;
	constructor(public navCtrl: NavController, public navParams: NavParams, public call: CallProvider) { 
		
	 }

	ionViewDidLoad() {
		console.log('ionViewDidLoad KeyboardPage');
		
		
	}

	

	getNumber = function (number) {
		//		console.log("number == " + number);
		 
		switch (number) {
			case "delete":
				this.phone_number = this.phone_number.substring(0, this.phone_number.length - 1);

				CallProvider.phoneNumberService = this.phone_number;
				break;
			default:
				{
					if (typeof this.phone_number === 'undefined') {
						this.phone_number = number;
					} else {
						this.phone_number += number;
						CallProvider.phoneNumberService = this.phone_number

					}

				}
					
				break;
				
				
		}
			// console.log(this.phone_number)
            this.newphone='';
			for(let i=0;i<this.phone_number.length;i++){
				let c=this.phone_number.charAt(i);
				this.newphone += c;
				if(this.newphone.length==3 || this.newphone.length==8){
					this.newphone += '-'
				}
			}
	}



}
