import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tripe Soup',
            'Recipe for tripe soup',
            'http://www.questbg.com/images/stories/foodanddrink/recipes/kiril%20kapustin%201600x1200.jpg',
            [
                new Ingredient('Milk', 1),
                new Ingredient('Pepper', 1)
            ]),
        new Recipe(
            'Kebapcheta',
            'Recipe for kebapcheta',
            'https://i.pinimg.com/originals/71/67/71/71677198305e1e50ce12d5e30ca72dc2.jpg',
            [
                new Ingredient('Spice', 1),
                new Ingredient('Meat', 1)
            ])
    ];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, updated: Recipe) {
        this.recipes[index] = updated;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
