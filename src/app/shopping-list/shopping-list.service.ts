import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("Tripe", 1),
        new Ingredient("Мincemeat", 2)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(data: Ingredient) {
        this.ingredients.push(data);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
    
}