import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CardListComponent } from './components/card-list/card-list.component';
import { GifCardComponent } from './components/gif-card/gif-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';



@NgModule({
  declarations: [
    CardListComponent,
    GifCardComponent,
    HomePageComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
