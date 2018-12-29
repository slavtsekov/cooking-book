import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()

export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private shoppingListService: ShoppingListService) {}

    storeRecipes() {
        return this.http.put('https://ng-cooking-book-37d0f.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get('https://ng-cooking-book-37d0f.firebaseio.com/recipes.json').pipe(
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
        return this.http.put('https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json', this.shoppingListService.getIngredients());
    }

    getShoppingList() {
        return this.http.get('https://ng-cooking-book-37d0f.firebaseio.com/shopping-list.json').subscribe((data: Ingredient[]) => {
            this.shoppingListService.setIngredients(data);
        });
    }
}
