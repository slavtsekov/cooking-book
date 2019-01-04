import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Tripe', 1),
        new Ingredient('Мincemeat', 2)
    ];

    setIngredients(data: Ingredient[]) {
        this.ingredients = data;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // remove when data service is edited
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
      return this.ingredients[index];
    }

    addIngredients(data: Ingredient[]) {
        this.ingredients.push(...data);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, edited: Ingredient) {
        this.ingredients[index] = edited;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
