import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as productActions from "../state/product.actions";
import * as fromProduct from "../state/product.reducer";
import { Product } from "../product.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromProduct.AppState>,
	  private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      price: ["", [Validators.required, Validators.pattern('[0-9]*[,]{0,1}[0-9]{0,2}')]], 
      id: null
    })

    const product$: Observable<Product> = this.store.select(
      fromProduct.getCurrentProduct
    )

    product$.subscribe(currentProduct => {
      if (currentProduct) {
        this.productForm.patchValue({
          name: currentProduct.name,
          price: currentProduct.price,
          id: currentProduct.id
        })
	    }
    })
  }

  updateProduct() {
    const updatedProduct: Product = {
      name: this.productForm.get("name").value,
      price: this.productForm.get("price").value,
      id: this.productForm.get("id").value
    };

    const controls = this.productForm.controls;

    if (this.productForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.store.dispatch(new productActions.UpdateProduct(updatedProduct));
	  this.router.navigate(['products']);
  }

}
