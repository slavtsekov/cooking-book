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
            take(1),
            map((authState: fromAuth.State) => {
                const isAuthenticated = authState.authenticated;
                if (!isAuthenticated) { this.router.navigate(['/signin']); }
                return isAuthenticated;
            })
        );
    }

    canLoad() {
        return this.store.select('auth').pipe(
            take(1),
            map((authState: fromAuth.State) => {
                return authState.authenticated;
            })
        );
    }
}
