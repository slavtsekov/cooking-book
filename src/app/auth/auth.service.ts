import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducer';
import { SignupAction, SigninAction, SetTokenAction, LogoutAction } from './store/auth.actions';

@Injectable()
export class AuthService {
    constructor(private router: Router, private store: Store<AppState>) {}
}
