import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { Recipe } from '../../recipes/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { AuthService } from '../../auth/auth.service';
import { AppState } from 'src/app/store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((data: Recipe[]) => {
      console.log(data);
    });
    this.dataStorageService.storeShoppingList().subscribe((data: Ingredient[]) => {
      console.log(data);
    });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
    this.dataStorageService.getShoppingList();
  }

  onLogout() {
    this.authService.logout();
  }
}
