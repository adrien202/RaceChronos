import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ChampionshipComponent} from "./modules/championship/championship.component";
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
  path: '', component: ChampionshipComponent
}]


@NgModule({
  declarations: [],
  imports: [BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
