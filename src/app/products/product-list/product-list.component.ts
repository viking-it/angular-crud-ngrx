import { Component, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as productActions from "../state/product.actions";
import * as fromProduct from "../state/product.reducer";
import { Product } from "../product.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  error$: Observable<String>;

  constructor(
	  private store: Store<fromProduct.AppState>,
	  private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(new productActions.LoadProducts());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.error$ = this.store.pipe(select(fromProduct.getError));
  }

  deleteProduct(product: Product) {
    if (confirm("Удалить продукт?")) {
      this.store.dispatch(new productActions.DeleteProduct(product.id));
    }
  }

  editProduct(product: Product) {
    this.store.dispatch(new productActions.LoadProduct(product.id));
	  this.router.navigate(['product-edit/'+product.id]);
  }
}
