import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListObservable: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnInit() {
    this.shoppingListObservable = this.store.select('shoppingList');
  }
}
