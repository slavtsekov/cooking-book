import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()

export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://ng-cooking-book-37d0f.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }
}
