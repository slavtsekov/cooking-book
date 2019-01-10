import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { FETCH_RECIPES, SET_RECIPES, STORE_RECIPES } from './recipes.actions';
import { Recipe } from '../recipe.model';
import { FeatureState } from './recipes.reducer';


@Injectable()
export class RecipeEffects {
    @Effect()
    recipesFetch = this.actions$.pipe(
        ofType(FETCH_RECIPES),
        switchMap(() => {
            const recipesUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/recipes.json';
            return this.http.get<Recipe[]>(recipesUrl);
        }),
        map((recipes) => {
            for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return {
                type: SET_RECIPES,
                payload: recipes
            };
        })
    );

    @Effect({dispatch: false})
    recipesStore = this.actions$.pipe(
        ofType(STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, store]) => {
            const recipesUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/recipes.json';

            return this.http.put(recipesUrl, store.recipes);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<FeatureState>
    ) {}
}
