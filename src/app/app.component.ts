import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { GeoPage } from '../pages/geo/geo';
import { NfcPage } from '../pages/nfc/nfc'
import { FlashPage } from '../pages/flash/flash';
import { DecibelPage } from '../pages/decibel/decibel';
import { BarcodePage } from '../pages/barcode/barcode';
import { FirebasePage } from '../pages/firebase/firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Geolocation', component: GeoPage },
      { title: 'NFC', component: NfcPage },
      { title: 'Flashlight', component: FlashPage },
      { title: 'Decibel Meter', component: DecibelPage },
      { title: 'Barcode Scanner', component: BarcodePage },
      { title: 'Firebase', component: FirebasePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // AFTER WEBVIEW IS FINISHED LOADING!
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
