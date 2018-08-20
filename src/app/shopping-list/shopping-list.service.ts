import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Tripe", 1),
        new Ingredient("Мincemeat", 2)
    ];

    getIngredients() {
        return this.ingredients;
    }

    addIngredient(data: Ingredient) {
        this.ingredients.push(data);
    }
    
}