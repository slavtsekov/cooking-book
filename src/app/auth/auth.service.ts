import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    private startSession = () => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
    }

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.startSession)
            .catch(error => console.error(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.startSession)
            .catch(error => console.error(error));
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/']);
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}
