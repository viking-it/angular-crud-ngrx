import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Store, State, select } from "@ngrx/store";
import * as productActions from "../state/product.actions";
import * as fromProduct from "../state/product.reducer";
import { Product } from "../product.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromProduct.AppState>,
	  private router: Router
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      price: ["", [Validators.required, Validators.pattern('[0-9]*[,]{0,1}[0-9]{0,2}')]] 
    });
  }

  createProduct() {
    const newProduct: Product = {
      name: this.productForm.get("name").value,
      price: this.productForm.get("price").value
    };

    const controls = this.productForm.controls;

    if (this.productForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.store.dispatch(new productActions.CreateProduct(newProduct));
	
	  this.router.navigate(['products']);
  }
}
