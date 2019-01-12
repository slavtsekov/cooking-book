import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { TryLogout } from '../../auth/store/auth.actions';
import { FetchRecipes, StoreRecipes } from '../../recipes/store/recipes.actions';
import { StoreIngredients, FetchIngredients } from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
    this.store.dispatch(new StoreIngredients());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
    this.store.dispatch(new FetchIngredients());
  }

  onLogout() {
    this.store.dispatch(new TryLogout());
  }
}
