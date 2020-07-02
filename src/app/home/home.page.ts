import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  providerFb: firebase.auth.FacebookAuthProvider;

  constructor(
      public afDB: AngularFireDatabase,
      public afAuth: AngularFireAuth,
      private fb: Facebook,
      public platform: Platform
  ) {
    this.providerFb = new firebase.auth.FacebookAuthProvider();
  }

  facebookLogin() {
    this.platform.is('cordova') ? this.facebookCordova() : this.facebookWeb();
  }

  facebookCordova() {
    console.log('platform: cordova');
    this.fb.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            console.log('Info Facebook: ' + JSON.stringify(success));
            this.afDB.object('Users/' + success.user.uid).set({
              displayName: success.user.displayName,
              photoURL: success.user.photoURL
            });
          }).catch((error) => {
        console.log('Erreur: ' + JSON.stringify(error));
      });
    }).catch((error) => { console.log(error); });
  }

  facebookWeb() {
    console.log('platform: web');
    this.afAuth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((success) => {
          this.afDB.object('Users/' + success.user.uid).set({
            displayName: success.user.displayName,
            photoURL: success.user.photoURL
          });
        }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
  }

}
