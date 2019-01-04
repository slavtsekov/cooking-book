import {
    ShoppingListActions,
    ADD_INGREDIENT,
    ADD_INGREDIENTS,
    UPDATE_INGREDIENT,
    DELETE_INGREDIENT
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
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case UPDATE_INGREDIENT:
            const updatedIngredients = state.ingredients.map((item, i) => {
                if (i === action.payload.index) {
                    return {
                        ...item,
                        ...action.payload.ingredient
                    };
                }

                return item;
            });
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((item, i) => action.payload !== i)
            };
        default:
            return state;
    }
}
