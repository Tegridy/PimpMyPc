import {
  ProductDto,
  ProductResponse,
} from './../../shared/model/ProductResponse';
import { ProductsService } from './products.service';
import { BaseProduct } from 'src/app/shared/model/BaseProduct';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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

  const mockProducts = [product, product2];

  const productDto: ProductDto = {
    number: 0,
    totalElements: 2,
    content: mockProducts,
  };

  const productsResponse: ProductResponse = {
    products: productDto,
  };

  const error = new ErrorEvent('Server error', {
    message: 'Server error occurred',
  });

  it('should return products response without filters', () => {
    service
      .getProductsPage(1, 'laptops', 1)
      .subscribe((response: ProductResponse) => {
        console.log(response);
        expect(response.products.content.length).toBe(2);
        expect(response.products.number).toBe(0);
        expect(response.products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products?page=1&size=9&categoryId=1'
    );

    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  it('should return products response with filters', () => {
    const filters = '&title=lenovo&ram=16';

    service
      .getProductsPage(1, 'laptops', 1, filters)
      .subscribe((products: ProductResponse) => {
        expect(products.products.content.length).toBe(2);
        expect(products.products.number).toBe(0);
        expect(products.products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products?page=1&title=lenovo&ram=16&size=9&categoryId=1'
    );
    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  it('should increment page number when it is negative', () => {
    const pageNumber = -5;

    service
      .getProductsPage(pageNumber, 'laptops', 1)
      .subscribe((products: ProductResponse) => {
        expect(products.products.content.length).toBe(2);
        expect(products.products.number).toBe(0);
        expect(products.products.totalElements).toBe(2);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products?page=0&size=9&categoryId=1'
    );
    req.flush(productsResponse);
    expect(req.request.method).toEqual('GET');
  });

  it('getProductsPage should handle server error', () => {
    service.getProductsPage(1, 'laptops', 1).subscribe(
      (products: ProductResponse) => () => fail('should not success'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err).toContain('code: 500');
        expect(err).toContain('Server error occurred');
      },
      () => fail('should not complete')
    );

    const req = httpMock
      .expectOne(
        'http://localhost:8080/api/v1/products?page=1&size=9&categoryId=1'
      )
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
    req.flush(productDto);
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
    req.flush(productDto);
    expect(req.request.method).toEqual('GET');
  });

  it('should return top selling products', () => {
    service.getTopSellingProducts().subscribe((products: ProductDto) => {
      expect(products.content.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/products/top');
    req.flush(productDto);
    expect(req.request.method).toEqual('GET');
  });

  it('should return newest product', () => {
    service.getNewestProduct().subscribe((p: ProductDto) => {
      expect(p.content[0].id).toBe(product.id);
      expect(p.content[0].title).toBe(product.title);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/newest'
    );

    const result: ProductDto = {
      content: [product],
      number: 1,
      totalElements: 1,
    };

    req.flush(result);
    expect(req.request.method).toEqual('GET');
  });

  it('should return product by id', () => {
    service.getProductById(2).subscribe((p: BaseProduct) => {
      expect(p.id).toBe(product2.id);
      expect(p.title).toEqual(product2.title);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/v1/products/' + product2.id
    );
    req.flush(product2);
    expect(req.request.method).toEqual('GET');
  });
});
