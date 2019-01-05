import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredientAction, DeleteIngredientAction, UpdateIngredientAction, StopEditAction } from '../store/shopping-list.actions';
import { AppState } from '../store/shopping-list.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  editedItemIndex: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe((data) => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editedItemIndex = data.editedIngredientIndex;
          this.editMode = true;
          this.shoppingEditForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const { name, amount } = form.value;
    const ingredient = this.createIngredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredientAction({index: this.editedItemIndex, ingredient}));
      this.editMode = false;
    } else {
      this.store.dispatch(new AddIngredientAction(this.createIngredient(name, amount)));
    }
    form.reset();
  }

  createIngredient(name: string, amount: string) {
    if (name !== '' && amount !== '') {
      return new Ingredient(name.trim(), parseInt(amount, 10));
    }
  }

  onClear() {
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredientAction(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEditAction());
    this.subscription.unsubscribe();
  }

}
