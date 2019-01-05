import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducer';
import { SignupAction, SigninAction, SetTokenAction, LogoutAction } from './store/auth.actions';

@Injectable()
export class AuthService {
    constructor(private router: Router, private store: Store<AppState>) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.store.dispatch(new SignupAction());
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => {
                            this.store.dispatch(new SetTokenAction(token));
                        }
                    );
            })
            .catch(error => console.error(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.store.dispatch(new SigninAction());
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => {
                            this.store.dispatch(new SetTokenAction(token));
                        }
                    );
            })
            .catch(error => console.error(error));
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new LogoutAction());
        this.router.navigate(['/']);
    }
}
