import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: "",
    pathMatch: "full",
    redirectTo: "/products"
  },
  {
    path: "products", 
	  loadChildren: "../app/products/product-list.module#ProductListModule"
  },
  {
    path: "product-add", 
	  loadChildren: "../app/products/product-add.module#ProductAddModule"
  },
  {
    path: "product-edit/:product", 
	  loadChildren: "../app/products/product-edit.module#ProductEditModule"
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
