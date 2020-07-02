import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Facebook } from '@ionic-native/facebook/ngx';

export const firebaseConfig = {
  apiKey: 'AIzaSyBukaqP447WJRkRdKfSszYZulmQXs83_zI',
  authDomain: 'travel-clip.firebaseapp.com',
  databaseURL: 'https://travel-clip.firebaseio.com',
  projectId: 'travel-clip',
  storageBucket: 'travel-clip.appspot.com',
  messagingSenderId: '490245439464',
  appId: '1:490245439464:web:a7d248e0831a0efa24ee5d',
  measurementId: 'G-9HNFE2CJ0J'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
