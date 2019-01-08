import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AddIngredientsAction } from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipes.reducer';
import { DeleteRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = parseInt(params['id'], 10);
        this.recipeState = this.store.select('recipes');
      });
  }

  sendToShoppingList() {
    this.store.select('recipes').pipe(
      take(1)
    ).subscribe((recipeState: fromRecipe.State) => {
      this.store.dispatch(new AddIngredientsAction(recipeState.recipes[this.id].ingredients));
    });
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
