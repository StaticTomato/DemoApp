import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Flashlight } from 'ionic-native';

@Component({
  selector: 'page-flash',
  templateUrl: 'flash.html'
})
export class FlashPage {
  // Flag to prevent multiple successive calls to the hardware (can provoke error)
  private flReady: boolean = true;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
      // Nothing to do...
    }

  // onPageCreated
  ionViewDidLoad() {
    console.log('ionViewDidLoad FlashPage');
  }

  // onPageEnter
  ionViewDidEnter() {
    // Nothing to do
  }

  // OnPageLeave
  ionViewDidLeave() {
    // Nothing to do
  }

  toggleFlashlight(event) {
    if(this.flReady) {
      this.flReady = false;
      Flashlight.toggle().then(() => this.flReady = true).catch((error) => {
          console.log('Could not toggle flashlight: ', error);
          this.flReady = true;
      });
    }
  }

}
