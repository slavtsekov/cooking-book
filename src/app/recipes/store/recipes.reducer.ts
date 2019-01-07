import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

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

export function recipesReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
