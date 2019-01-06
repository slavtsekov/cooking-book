import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';

import {
    TRY_SIGNUP,
    SIGNUP,
    SET_TOKEN,
    TRY_SIGNIN,
    SIGNIN,
    TrySignup,
    TrySignin
} from './auth.actions';


@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(TRY_SIGNUP),
        map((action: TrySignup) => action.payload),
        switchMap((authData: {username: string, password: string}) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: SIGNUP
                },
                {
                    type: SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    @Effect()
    authSignin = this.actions$.pipe(
        ofType(TRY_SIGNIN),
        map((action: TrySignin) => action.payload),
        switchMap((authData: {username: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: SIGNIN
                },
                {
                    type: SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    constructor(private actions$: Actions, private router: Router) {}
}
