import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html'
})
export class BarcodePage {
  // Flag to prevent multiple successive calls to the hardware (can provoke error)
  private bsReady: boolean = true;
  // Scan result
  private result: any;

  constructor(public navCtrl: NavController) {
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

  doScan() {
    if(this.bsReady) {
      this.bsReady = false;
      BarcodeScanner.scan().then((result) => {
        this.result = result;
        this.bsReady = true;
      }).catch((error) => {
        console.log('Error scanning: ', error);
        this.bsReady = true;
      });
    }
  }

}
