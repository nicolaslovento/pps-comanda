import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule} from '@angular/fire/firestore';

import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyCrIVYtWMfWJ_4QmwochrvVX9Aq11swuZU",
  authDomain: "pps-comanda.firebaseapp.com",
  databaseURL: "https://pps-comanda.firebaseio.com",
  projectId: "pps-comanda",
  storageBucket: "pps-comanda.appspot.com",
  messagingSenderId: "279473463120",
  appId: "1:279473463120:web:ccc8149b268e15e48f5655"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireStorageModule,AngularFirestoreModule,],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
