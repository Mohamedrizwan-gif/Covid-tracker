import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ViewDataComponent } from './components/view/view_data.component';
import { MaterialModule } from './material/material.module';
import { IndexComponent } from './pages/index/index.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { SpinnerComponent } from './components/overlay/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ViewDataComponent,
    IndexComponent,
    OverlayComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }