import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { FETCH_INGREDIENTS, SET_INGREDIENTS, STORE_INGREDIENTS } from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';
import { State } from './shopping-list.reducer';

@Injectable()
export class ShoppingListEffects {
    @Effect()
    ingredientsFetch = this.actions$.pipe(
        ofType(FETCH_INGREDIENTS),
        switchMap(() => {
            const shoppingListUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json';
            return this.http.get<Ingredient[]>(shoppingListUrl);
        }),
        map((ingredients) => {
            return {
                type: SET_INGREDIENTS,
                payload: ingredients
            };
        })
    );

    @Effect({dispatch: false})
    ingredientsStore = this.actions$.pipe(
        ofType(STORE_INGREDIENTS),
        withLatestFrom(this.store.select('shoppingList')),
        switchMap(([action, store]) => {
            const shoppingListUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json';

            return this.http.put(shoppingListUrl, store.ingredients);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<State>) {}
}
