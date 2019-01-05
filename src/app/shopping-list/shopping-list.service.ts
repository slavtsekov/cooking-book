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
}
