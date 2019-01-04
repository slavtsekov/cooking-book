import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { CookingBookStore } from 'src/app/shared/store.model';
import { AddIngredientsAction } from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  data: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<CookingBookStore>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = parseInt(params['id'], 10);
        this.data = this.recipeService.getRecipe(this.id);
      });
  }

  sendToShoppingList() {
    this.store.dispatch(new AddIngredientsAction(this.data.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
