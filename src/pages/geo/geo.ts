import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation, Coordinates } from 'ionic-native';

@Component({
  selector: 'page-geo',
  templateUrl: 'geo.html'
})
export class GeoPage {
  // Geopositions - timestamp and coordinates:
  private coords: Coordinates;
  private timestamp: number;
  // watcher for geolocation;
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
    this.watcher = Geolocation.watchPosition()
      .subscribe((position) => {
        this.coords = position.coords;
        this.timestamp = position.timestamp;
    });
    this.toastCtrl.create({
      message: 'Tracking position',
      duration: 3000
    }).present();
  }

  // OnPageLeave
  ionViewDidLeave() {
    this.watcher.unsubscribe();
  }

}
