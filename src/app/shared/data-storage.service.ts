import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { AppState } from '../shopping-list/store/shopping-list.reducer';
import { SetIngredientsAction } from '../shopping-list/store/shopping-list.actions';

@Injectable()

export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<AppState>
    ) {}

    storeRecipes() {
        const recipesUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/recipes.json';

        return this.http.put(recipesUrl, this.recipeService.getRecipes());
    }

    getRecipes() {
        const recipesUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/recipes.json';

        return this.http.get<Recipe[]>(recipesUrl).pipe(
            map((data) => {
                for (const recipe of data) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return data;
            })
        ).subscribe((data) => {
            this.recipeService.setRecipes(data);
        });
    }

    storeShoppingList() {
        const shoppingListUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json';
        let httpObservable = null;
        this.store.select('shoppingList').subscribe((data) => {
            httpObservable = this.http.put(shoppingListUrl, data.ingredients);
        });
        return httpObservable;
    }

    getShoppingList() {
        const shoppingListUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json';

        return this.http.get<Ingredient[]>(shoppingListUrl)
            .subscribe((data) => {
                this.store.dispatch(new SetIngredientsAction(data));
            });
    }
}
