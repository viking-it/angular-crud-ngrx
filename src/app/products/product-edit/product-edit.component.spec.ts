import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';
describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  beforeEach(() => {
    const formBuilderStub = { group: object => ({}) };
    const storeStub = {
      select: getCurrentProduct => ({ subscribe: () => ({}) }),
      dispatch: arg => ({})
    };
    const routerStub = { navigate: array => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductEditComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Store, useValue: storeStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(storeStub, 'select').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });
});
