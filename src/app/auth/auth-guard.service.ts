import { CanActivate, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { AppState } from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private store: Store<AppState>) {}

    canActivate() {
        return this.store.select('auth').pipe(
            map((authState: fromAuth.State) => {
                this.router.navigate(['/signin']);
                return authState.authenticated;
            })
        );
    }

    canLoad() {
        return this.store.select('auth').pipe(
            map((authState: fromAuth.State) => {
                return authState.authenticated;
            }),
            take(1)
        );
    }
}
