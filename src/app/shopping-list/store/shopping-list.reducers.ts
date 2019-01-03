import {
    ShoppingListActions,
    ADD_INGREDIENT
} from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Tripe', 1),
        new Ingredient('Мincemeat', 2)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}
