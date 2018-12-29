import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyByeyIynzC1Lc-_vztST6fR1IVVpFcLBgM',
      authDomain: 'ng-cooking-book-37d0f.firebaseapp.com',
    });
  }
}
