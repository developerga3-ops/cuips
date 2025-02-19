import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableDocsComponent } from './components/table-docs/table-docs.component';
import { UpdatePDFSComponent } from './components/update-pdfs/update-pdfs.component';
import { ClrCheckboxModule } from '@clr/angular';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableDocsComponent,
    UpdatePDFSComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ClrCheckboxModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
