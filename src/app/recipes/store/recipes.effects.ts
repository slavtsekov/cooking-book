import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import { FETCH_RECIPES, SET_RECIPES } from './recipes.actions';
import { Recipe } from '../recipe.model';


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

    constructor(private actions$: Actions, private http: HttpClient) {}
}
