import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { ProductListComponent } from './product-list.component';
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  beforeEach(() => {
    const storeStub = { dispatch: arg => ({}), pipe: arg => ({}) };
    const productStub = { id: {} };
    const routerStub = { navigate: array => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductListComponent],
      providers: [
        { provide: Store, useValue: storeStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch').and.callThrough();
      spyOn(storeStub, 'pipe').and.callThrough();
      component.ngOnInit();
      expect(storeStub.dispatch).toHaveBeenCalled();
      expect(storeStub.pipe).toHaveBeenCalled();
    });
  });
});
