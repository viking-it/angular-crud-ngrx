import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { productReducer } from "./state/product.reducer";
import { ProductEffect } from "./state/product.effects";

import { ProductEditComponent } from "./product-edit/product-edit.component";

const productRoutes: Routes = [{ path: "", component: ProductEditComponent }, { path: ":product", component: ProductEditComponent }];

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
    ProductEditComponent
  ]
})
export class ProductEditModule {}
