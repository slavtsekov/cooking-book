import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("Tripe", 1),
        new Ingredient("Мincemeat", 2)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(data: Ingredient) {
        this.ingredients.push(data);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(data: Ingredient[]) {
        this.ingredients.push(...data);
        this.ingredientsChanged.next(this.ingredients.slice());
    }    
}