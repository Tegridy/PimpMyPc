import { Motherboard, Processor, Ram } from './../../shared/model/BaseProduct';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorService } from './configurator.service';
import { ProductCategory } from '../../shared/model/ProductCategory';
import { ProductsService } from './products.service';
import { of } from 'rxjs';

describe('ConfiguratorService', () => {
  let service: ConfiguratorService;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(ConfiguratorService);
    productsService = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add single part to customer computer', () => {
    const processor: Processor = {
      id: 1,
      title: 'Processor',
      price: 1900,
      motherboardSocket: 'LGA2022',
      tdp: '250',
      categories: [{ title: 'Processors' } as ProductCategory],
    };

    spyOn(productsService, 'getProductById').and.returnValue(of(processor));

    service.addPart(1);

    service.customerComputer.subscribe((computer) => {
      expect(computer.processor.title).toEqual(processor.title);
    });
  });

  it('should add multiple parts to customer computer', () => {
    const processor: Processor = {
      id: 1,
      title: 'Processor',
      price: 1900,
      motherboardSocket: 'LGA2022',
      tdp: '250',
      categories: [{ title: 'Processors' } as ProductCategory],
    };

    const motherboard: Motherboard = {
      id: 2,
      title: 'Processor',
      price: 800,
      motherboardSocket: 'LGA2022',
      motherboardFormat: 'ATX',
      ramType: 'DDR4',
      categories: [{ title: 'Motherboards' } as ProductCategory],
    };

    const ram: Ram = {
      id: 3,
      title: 'Processor',
      price: 900,
      moduleType: 'DDR4',
      categories: [{ title: 'Memory RAM' } as ProductCategory],
    };

    spyOn(productsService, 'getProductById').and.returnValues(
      of(processor),
      of(motherboard),
      of(ram)
    );

    service.addPart(1);
    service.addPart(2);
    service.addPart(3);

    service.customerComputer.subscribe((computer) => {
      expect(computer.processor).toBeTruthy();
      expect(computer.processor.title).toEqual(processor.title);

      expect(computer.motherboard).toBeTruthy();
      expect(computer.motherboard.title).toEqual(motherboard.title);

      expect(computer.ram).toBeTruthy();
      expect(computer.ram.title).toEqual(ram.title);
    });
  });
});
