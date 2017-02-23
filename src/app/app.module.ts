import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GeoPage } from '../pages/geo/geo';
import { NfcPage } from '../pages/nfc/nfc';
import { FlashPage } from '../pages/flash/flash';
import { DecibelPage } from '../pages/decibel/decibel';
import { BarcodePage } from '../pages/barcode/barcode';
import { FirebasePage } from '../pages/firebase/firebase';

// Firebase stuff:
import { AngularFireModule } from 'angularfire2';
export const firebaseConfig  = {
    apiKey: "AIzaSyBIS3UGlgc3UbIwR3njryeAchuXqF_cLYY",
    authDomain: "bustling-art-152015.firebaseapp.com",
    databaseURL: "https://bustling-art-152015.firebaseio.com",
    storageBucket: "bustling-art-152015.appspot.com",
    messagingSenderId: "24416992094"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GeoPage,
    NfcPage,
    FlashPage,
    DecibelPage,
    BarcodePage,
    FirebasePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GeoPage,
    NfcPage,
    FlashPage,
    DecibelPage,
    BarcodePage,
    FirebasePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
