import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private shoppingListService: ShoppingListService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const token = this.authService.getToken();
        const recipesUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/recipes.json';
        const params = new HttpParams().set('auth', token);

        return this.http.put(recipesUrl, this.recipeService.getRecipes(), { params });
    }

    getRecipes() {
        const token = this.authService.getToken();
        const recipesUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/recipes.json';
        const params = new HttpParams().set('auth', token);

        return this.http.get<Recipe[]>(recipesUrl, { params }).pipe(
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
        const token = this.authService.getToken();
        const shoppingListUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json';
        const params = new HttpParams().set('auth', token);

        return this.http.put(shoppingListUrl, this.shoppingListService.getIngredients(), { params });
    }

    getShoppingList() {
        const token = this.authService.getToken();
        const shoppingListUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json';
        const params = new HttpParams().set('auth', token);

        return this.http.get<Ingredient[]>(shoppingListUrl, { params })
            .subscribe((data) => {
                this.shoppingListService.setIngredients(data);
            });
    }
}
