import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

        return this.http.put('https://ng-cooking-book-37d0f.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        return this.http.get('https://ng-cooking-book-37d0f.firebaseio.com/recipes.json?auth=' + token).pipe(
            map((data: Recipe[]) => {
                for (const recipe of data) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return data;
            })
        ).subscribe((data: Recipe[]) => {
            this.recipeService.setRecipes(data);
        });
    }

    storeShoppingList() {
        const token = this.authService.getToken();
        const putUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json?auth=' + token;

        return this.http.put(putUrl, this.shoppingListService.getIngredients());
    }

    getShoppingList() {
        const token = this.authService.getToken();

        return this.http.get('https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json?auth=' + token)
            .subscribe((data: Ingredient[]) => {
                this.shoppingListService.setIngredients(data);
            });
    }
}
