import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';

@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html'
})
export class NfcPage {
  // The discovered tag
  private tag: string;
  private ndefMessage: string;
  // Watchers
  private nfcWatcher: any;
  private ndefWatcher: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
      // Nothing to do...
  }

  // onPageCreated
  ionViewDidLoad() {
    // Nothing to do...
  }

  // onPageEnter
  ionViewDidEnter() {
    NFC.enabled().then((data) => {
      console.log("Listening for NFC Tags: ", data);
      this.toastCtrl.create({
        message: 'Listening for NFC Tags',
        duration: 3000
      }).present();
      this.nfcWatcher = NFC.addTagDiscoveredListener().subscribe((nfcEvent) => {
        this.tag = JSON.stringify(nfcEvent.tag,null,2);
        this.ndefMessage = "";
        this.toastCtrl.create({
          message: 'NFC Tag detected',
          duration: 3000
        }).present();
      });
      this.ndefWatcher = NFC.addNdefListener().subscribe((nfcEvent) => {
        this.tag = JSON.stringify(nfcEvent.tag,null,2);
        let s = NFC.bytesToString(nfcEvent.tag.ndefMessage[0]["payload"]);
        this.ndefMessage = s.substring(3,s.length);
        this.toastCtrl.create({
          message: 'NFC Tag detected (Ndef)',
          duration: 3000
        }).present();
      });
    }).catch((error) => {
      console.log("Error listening for NFC Tags: ", error);
    });
  }

  // OnPageLeave
  ionViewDidLeave() {
    this.nfcWatcher.unsubscribe();
    this.ndefWatcher.unsubscribe();
  }

  writeTextToNdefTag(text: string) {
    let t = Ndef.textRecord(text);
    NFC.write([t]).then(() => {
      this.toastCtrl.create({
        message: 'Successfully wrote text to Ndef tag',
        duration: 3000
      }).present();
    }).catch(() => {
      this.toastCtrl.create({
        message: 'Could not write text to Ndef Tag',
        duration: 3000
      }).present();
    });
  }

  writeURLToNdefTag(url: string) {
    let t = Ndef.uriRecord(url);
    NFC.write([t]).then(() => {
      this.toastCtrl.create({
        message: 'Successfully wrote URL to Ndef tag',
        duration: 3000
      }).present();
    }).catch(() => {
      this.toastCtrl.create({
        message: 'Could not write URL to Ndef Tag',
        duration: 3000
      }).present();
    });
  }

}
