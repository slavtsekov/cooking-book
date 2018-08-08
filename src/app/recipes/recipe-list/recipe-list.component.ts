import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Tripe Soup", "Recipe for tripe soup", "http://www.questbg.com/images/stories/foodanddrink/recipes/kiril%20kapustin%201600x1200.jpg"),
    new Recipe("Kebapcheta", "Recipe for kebapcheta", "https://i.pinimg.com/originals/71/67/71/71677198305e1e50ce12d5e30ca72dc2.jpg")
  ];

  @Output() select = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelect(recipe: Recipe) {
    this.select.emit(recipe);
  }

}
