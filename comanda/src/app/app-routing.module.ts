import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'menu-dueño', loadChildren: './paginas/dueño/menu/menu.module#MenuPageModule' },
  { path: 'alta-dueño', loadChildren: './paginas/dueño/alta/alta.module#AltaPageModule' },
  { path: 'alta-supervisor', loadChildren: './paginas/supervisor/alta/alta.module#AltaPageModule' },
  { path: 'menu-supervisor', loadChildren: './paginas/supervisor/menu/menu.module#MenuPageModule' },
  { path: 'alta-metre', loadChildren: './paginas/empleados/metre/alta/alta.module#AltaPageModule' },
  { path: 'menu-metre', loadChildren: './paginas/empleados/metre/menu/menu.module#MenuPageModule' },
  { path: 'menu-cocinero', loadChildren: './paginas/empleados/cocinero/menu/menu.module#MenuPageModule' },
  { path: 'alta-cocinero', loadChildren: './paginas/empleados/cocinero/alta/alta.module#AltaPageModule' },
  { path: 'alta-bartender', loadChildren: './paginas/empleados/bartender/alta/alta.module#AltaPageModule' },
  { path: 'menu-bartender', loadChildren: './paginas/empleados/bartender/menu/menu.module#MenuPageModule' },
  { path: 'menu-cliente', loadChildren: './paginas/cliente/menu/menu.module#MenuPageModule' },
  { path: 'alta-cliente', loadChildren: './paginas/cliente/alta/alta.module#AltaPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
