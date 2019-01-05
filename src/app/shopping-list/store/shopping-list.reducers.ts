import {
    ShoppingListActions,
    ADD_INGREDIENT,
    ADD_INGREDIENTS,
    UPDATE_INGREDIENT,
    DELETE_INGREDIENT,
    START_EDIT,
    STOP_EDIT,
    SET_INGREDIENTS
} from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Tripe', 1),
        new Ingredient('Мincemeat', 2)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
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
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
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
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((item, i) => action.payload !== i),
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient,
                editedIngredientIndex: action.payload
            };
        case STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}
