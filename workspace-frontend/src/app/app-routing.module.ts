import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RutaAComponent } from './components/ruta-a/ruta-a.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'ruta-a', component: RutaAComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
