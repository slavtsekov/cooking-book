import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipesActions, SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from './recipes.actions';

export interface FeatureState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
    ]
};

export function recipesReducer(state = initialState, action: RecipesActions) {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case UPDATE_RECIPE:
            const updatedRecipes = state.recipes.map((item, i) => {
                if (i === action.payload.index) {
                    return {
                        ...item,
                        ...action.payload.updated
                    };
                }

                return item;
            });
            return {
                ...state,
                recipes: updatedRecipes
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((item, i) => action.payload !== i)
            };
        default:
            return state;
    }
}
