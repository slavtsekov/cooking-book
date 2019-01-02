import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'shopping-list',
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
