import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { productReducer } from "./state/product.reducer";
import { ProductEffect } from "./state/product.effects";

import { ProductListComponent } from "./product-list/product-list.component";

const productRoutes: Routes = [{ path: "", component: ProductListComponent }];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature("products", productReducer),
    EffectsModule.forFeature([ProductEffect])
  ],
  declarations: [

    ProductListComponent
  ]
})
export class ProductListModule {}
