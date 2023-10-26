import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FlightInfoPayload } from './flightinfo.model';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;
    error = null;
    success = null;
    flightData:FlightInfoPayload = null;
    @ViewChild('postForm') postForm: NgForm;
    isFetching = false;

    constructor(private http: HttpClient, private authService: AuthService) {}

    onSubmit() {
      this.isFetching = true;
      this.flightData = this.postForm.value
      this.http.post('https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge',
            this.flightData,
            {
              headers: new HttpHeaders({
                'candidate': 'Sahitya Panchapakesan',
                'token' : 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh'
              })
           }
            ).subscribe(responseData => {
              this.postForm.reset();
              this.isFetching = false;
              this.success = responseData;
            },
            error => {
            this.isFetching = false;
              this.error = error.message;
            });
    }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
          console.log("valid")
          console.log("user"+user)
          this.isAuthenticated = !user?false:true;
        });
    }

    ngOnDestroy() {
      this.userSub.unsubscribe();
    }
}

