import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("Tripe Soup", "Recipe for tripe soup", "http://www.questbg.com/images/stories/foodanddrink/recipes/kiril%20kapustin%201600x1200.jpg"),
        new Recipe("Kebapcheta", "Recipe for kebapcheta", "https://i.pinimg.com/originals/71/67/71/71677198305e1e50ce12d5e30ca72dc2.jpg")
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}