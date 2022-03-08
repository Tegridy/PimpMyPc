import {
  ProductResponse,
  ProductDto,
} from './../../shared/model/ProductResponse';
import { ProductsService } from './products.service';
import {
  UserEdit,
  UserEditAddress,
  UserEditAuth,
} from './../../shared/model/UserEdit';
import { LoginDetails } from './../../shared/model/LoginDetails';
import { UserService } from './user.service';
import { Order, OrderResponse } from './../../shared/model/Order';
import { Category } from './../../shared/model/Category';
import { Processor, Motherboard, Ram } from './../../shared/model/BaseProduct';
import { BaseProduct } from 'src/app/shared/model/BaseProduct';
import { CartService } from './cart.service';
import { Address } from './../../shared/model/User';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import set = Reflect.set;
import {
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/shared/model/User';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorService } from './configurator.service';
import { OrderService } from './order.service';
import { CustomerOrderDetails, OrderDto } from 'src/app/shared/model/Order';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
  const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };

  const productDto: ProductDto = {
    number: 0,
    totalElements: 2,
    content: [product, product2],
  };

  const productsResponse: ProductResponse = {
    products: productDto,
  };

  const error = new ErrorEvent('Server error', {
    message: 'Server error occurred',
  });

  it('should return products response without filters', () => {
    service
      .getProductsPage(1, 'laptops')
      .subscribe((products: ProductResponse) => {
        expect(products.products.content.length).toBe(2);
        expect(products.products.number).toBe(0);
        expect(products.products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/laptops?page=1&size=9'
    );
    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  it('should return products response with filters', () => {
    const filters = '&title=lenovo&ram=16';

    service
      .getProductsPage(1, 'laptops', filters)
      .subscribe((products: ProductResponse) => {
        expect(products.products.content.length).toBe(2);
        expect(products.products.number).toBe(0);
        expect(products.products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/laptops?page=1&title=lenovo&ram=16&size=9'
    );
    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  it('should increment page number when it is negative', () => {
    const pageNumber = -5;

    service
      .getProductsPage(pageNumber, 'laptops')
      .subscribe((products: ProductResponse) => {
        expect(products.products.content.length).toBe(2);
        expect(products.products.number).toBe(0);
        expect(products.products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/laptops?page=0&size=9'
    );
    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  it('getProductsPage should handle server error', () => {
    service.getProductsPage(1, 'laptops').subscribe(
      (products: ProductResponse) => () => fail('should not success'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error).toContain('code: 500');
        expect(error).toContain('Server error occurred');
      },
      () => fail('should not complete')
    );

    const req = httpMock
      .expectOne('http://localhost:8080/api/v1/products/laptops?page=1&size=9')
      .error(error, { status: 500 });
  });

  it('should find products by given category', () => {
    service
      .findProductsByCategory('dell', 1, 'laptops')
      .subscribe((products: ProductDto) => {
        expect(products.content.length).toBe(2);
        expect(products.number).toBe(0);
        expect(products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/search?productName=dell&productCategory=laptops&size=9&page=1'
    );
    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  it('should find products by given default category', () => {
    service
      .findProductsByCategory('dell', 1)
      .subscribe((products: ProductDto) => {
        expect(products.content.length).toBe(2);
        expect(products.number).toBe(0);
        expect(products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/search?productName=dell&size=9&page=1'
    );
    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  const mockTopSellingProducts: BaseProduct[] = [product, product2];

  it('should return top selling products', () => {
    service.getTopSellingProducts().subscribe((products: BaseProduct[]) => {
      expect(products.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/products/top');
    req.flush(mockTopSellingProducts);
    expect(req.request.method).toEqual('GET');
  });

  it('should return newest product', () => {
    service.getNewestProduct().subscribe((product: BaseProduct) => {
      expect(product.id).toBe(1);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/newest'
    );
    req.flush(product);
    expect(req.request.method).toEqual('GET');
  });

  it('should return product by id', () => {
    service.getProductById(2).subscribe((product: BaseProduct) => {
      expect(product.id).toBe(product2.id);
      expect(product.title).toEqual(product2.title);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/' + product2.id
    );
    req.flush(product2);
    expect(req.request.method).toEqual('GET');
  });
});
