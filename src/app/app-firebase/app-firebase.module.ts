import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebase)],
  exports: [AngularFireModule, AngularFireAuthModule, AngularFireDatabaseModule],
})
export class AppFirebaseModule {}