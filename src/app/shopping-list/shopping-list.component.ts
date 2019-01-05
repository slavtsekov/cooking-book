import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { AppState } from './store/shopping-list.reducers';
import { StartEditAction } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListObservable: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private store: Store<AppState>
  ) { }

  onEditItem(index: number) {
    this.store.dispatch(new StartEditAction(index));
  }

  ngOnInit() {
    this.shoppingListObservable = this.store.select('shoppingList');
  }
}
