import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()

export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private shoppingListService: ShoppingListService
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

        return this.http.put(shoppingListUrl, this.shoppingListService.getIngredients());
    }

    getShoppingList() {
        const shoppingListUrl = 'https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json';

        return this.http.get<Ingredient[]>(shoppingListUrl)
            .subscribe((data) => {
                this.shoppingListService.setIngredients(data);
            });
    }
}
