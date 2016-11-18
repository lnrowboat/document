import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';

import { DocumentComponent } from './document.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 })
  ],
  declarations: [
    AppComponent,
    routedComponents,
    DocumentComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
