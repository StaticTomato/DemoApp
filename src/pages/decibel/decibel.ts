import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DBMeter } from 'ionic-native';

@Component({
  selector: 'page-decibel',
  templateUrl: 'decibel.html'
})
export class DecibelPage {
  // dB value
  private dbValue: number;
  // Watchers
  private watcher: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    // Nothing to do...
  }

  // onPageCreated
  ionViewDidLoad() {
    // Nothing to do...
  }

  // onPageEnter
  ionViewDidEnter() {
    DBMeter.isListening().then((result) => {
      if(!result) {
        this.watcher = DBMeter.start().subscribe((data) => {
          this.dbValue = data;
        });
        this.toastCtrl.create({
          message: 'Decibel Meter started',
          duration: 3000
        }).present();
      }
    });
  }

  // OnPageLeave
  ionViewDidLeave() {
    DBMeter.isListening().then((result) => {
      if(result) {
        this.watcher.unsubscribe(() => {
          DBMeter.delete();
        });
      }
    });
  }

}
