import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDesignerComponent } from './pages/teammates/create/create.component';
import { EditDesignerComponent } from './pages/teammates/edit/edit.component';

// Firebase
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from "../environments/environment";
import { ListDesignersComponent } from './pages/teammates/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalystService } from './services/catalyst.service';

// Search
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailDesignerComponent } from './pages/teammates/detail/detail.component';
import { LogoComponent } from './components/logo/logo.component';
import { HttpClientModule } from '@angular/common/http'
// import { searchPipe } from './pipes/search.pipe'
 

@NgModule({
  declarations: [
    AppComponent,
    CreateDesignerComponent,
    EditDesignerComponent,
    ListDesignersComponent,
    DetailDesignerComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule
    ],
  providers: [
    CatalystService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
