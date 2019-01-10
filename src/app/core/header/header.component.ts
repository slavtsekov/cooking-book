import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { Recipe } from '../../recipes/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { AppState } from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { TryLogout } from '../../auth/store/auth.actions';
import { FetchRecipes, StoreRecipes } from '../../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService, private store: Store<AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
    this.dataStorageService.storeShoppingList().subscribe((data: Ingredient[]) => {
      console.log(data);
    });
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
    this.dataStorageService.getShoppingList();
  }

  onLogout() {
    this.store.dispatch(new TryLogout());
  }
}
