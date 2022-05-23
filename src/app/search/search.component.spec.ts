import { SpinnerComponent } from './../shared/spinner/spinner.component';
import { PaginationComponent } from './../shared/pagination/pagination.component';
import { BaseProduct } from './../shared/model/BaseProduct';
import { SearchComponent } from './search.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        PaginatePipe,
        PaginationComponent,
        SpinnerComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxPaginationModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.searchedProducts = mockSearchResults;
    component.loading = false;

    fixture.detectChanges();
  });

  const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
  const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };
  const product3: BaseProduct = { id: 3, title: 'Mouse', price: 2400 };

  const mockSearchResults: BaseProduct[] = [product, product2, product3];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products list', () => {
    const products = el.queryAll(By.css('#product-wrapper'));

    expect(products).toBeTruthy('Could not find products');
    expect(products.length).toBe(3, 'Unexpected number of products');
  });

  it('should display the first product', () => {
    const p = el.query(By.css('#product-wrapper:first-child'));
    const title = p.query(By.css('h3'));

    expect(product).toBeTruthy('Could not find product');

    expect(title.nativeElement.textContent).toBe(mockSearchResults[0].title);
  });
});
