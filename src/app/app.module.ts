import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'bookFlight', component: BookFlightComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookFlightComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
