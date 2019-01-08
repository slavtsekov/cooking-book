import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { FeatureState } from '../store/recipes.reducer';
import { UpdateRecipe, AddRecipe } from '../store/recipes.actions';
import * as fromRecipe from '../store/recipes.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = parseInt(params['id'], 10);
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    const { name, description, imagePath, ingredients } = this.recipeForm.value;
    const recipe = new Recipe(name, description, imagePath, ingredients);
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe({index: this.id, updated: recipe}));
    } else {
      this.store.dispatch(new AddRecipe(recipe));
    }
    this.navigateAway();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.navigateAway();
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes').pipe(
        take(1)
      ).subscribe((recipeState: fromRecipe.State) => {
        const recipe = recipeState.recipes[this.id];
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      });
    }

    this.recipeForm = this.formBuilder.group({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  private navigateAway() {
    this.router.navigate(['../../', this.id], { relativeTo: this.route });
  }

}
