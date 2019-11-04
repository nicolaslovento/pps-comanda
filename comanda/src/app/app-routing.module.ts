import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'menu-dueño', loadChildren: './paginas/dueño/menu/menu.module#MenuPageModule' },
  { path: 'alta-dueño', loadChildren: './paginas/dueño/alta/alta.module#AltaPageModule' },
  { path: 'alta-supervisor', loadChildren: './paginas/supervisor/alta/alta.module#AltaPageModule' },
  { path: 'menu-supervisor', loadChildren: './paginas/supervisor/menu/menu.module#MenuPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
