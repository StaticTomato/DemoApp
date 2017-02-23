import { Component, Inject } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'page-firebase',
  templateUrl: 'firebase.html'
})
export class FirebasePage {
  // Firebase stuff:
  private items: FirebaseListObservable<any[]>;
  // Default img
  private defaultImgURL: string;

  constructor(public navCtrl: NavController, public angularFire: AngularFire,
      public alertCtrl: AlertController, @Inject(FirebaseApp) public firebaseApp: firebase.app.App) {
    // Get items fomr Firebase Database:
    this.items = angularFire.database.list('/items');
    // Get URL to the default image:
    firebaseApp.storage().ref().child("/items/item_box.png").getDownloadURL()
    .then((url) => {
      this.defaultImgURL = url;
    }).catch((error) => {
      // Ignore for now...
    });
    // Get image URL from Firebase Storage:
    // this.items.subscribe((snapshots => {
    //   snapshots.forEach((snapshot => {
    //     firebaseApp.storage().ref().child(snapshot.val.img)
    //       .getDownloadURL().then((url) => {
    //         this.images[snapshot.key] = url;
    //         console.log("Image URL: ",url);
    //       }).catch((error) => {
    //         console.log("Error getting URL: ",error);
    //       });
    //   }));
    // }));
  }

  // onPageCreated
  ionViewDidLoad() {
    // Nothing to do...
  }

  // onPageEnter
  ionViewDidEnter() {
    // Nothing to do
  }

  // OnPageLeave
  ionViewDidLeave() {
    // Nothing to do
  }

  addItem() {
    this.alertCtrl.create({
    message: 'New item:',
    inputs: [
      {
        name: 'name',
        placeholder: 'Name',
        type: 'text'
      },
      {
        name: 'description',
        placeholder: 'Description',
        type: 'text'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Add',
        handler: data => {
          if (data.name.trim().length > 0 && data.description.trim().length > 0) {
              this.items.push({name: data.name, description: data.description, img: "/items/item_box.png"});
          }
        }
      }
    ]
  }).present();
  }

  editItem(item: any) {
    this.alertCtrl.create({
    message: 'Edit item:',
    inputs: [
      {
        name: 'name',
        value: item.name,
        type: 'text'
      },
      {
        name: 'description',
        value: item.description,
        type: 'text'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
          if (data.name.trim().length > 0 && data.description.trim().length > 0) {
              this.items.update(item.$key,{name: data.name, description: data.description});
          }
        }
      }
    ]
  }).present();
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

}
