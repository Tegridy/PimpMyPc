import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Event, Router } from '@angular/router';

import { BuildPcComponent } from './build-pc.component';
import { Computer } from '../shared/model/Computer';
import {
  Case,
  GraphicCard,
  Motherboard,
  PowerSupply,
  Processor,
  Ram,
} from '../shared/model/BaseProduct';
import { server } from 'ionicons/icons';
import { CartService } from '../core/services/cart.service';
import { ProductDetail } from '../shared/model/ProductDetail';

describe('BuildPcComponent', () => {
  let component: BuildPcComponent;
  let fixture: ComponentFixture<BuildPcComponent>;
  let el: DebugElement;
  let mockRouter: Router;
  let service: CartService;
  let computer: Computer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastrService],
      declarations: [BuildPcComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildPcComponent);
    mockRouter = TestBed.inject(Router);
    service = TestBed.inject(CartService);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    const processor = {
      id: 1,
      title: 'Processor',
      price: 999,
      attributes: [
        new ProductDetail('motherboardSocket', '1511'),
        new ProductDetail('tdp', '150'),
      ],
    } as Processor;
    const motherboard = {
      id: 2,
      title: 'Motherboard',
      price: 999,
      attributes: [
        new ProductDetail('motherboardSocket', '1511'),
        new ProductDetail('motherboardFormat', 'ATX'),
        new ProductDetail('ramType', 'DDR4'),
      ],
    } as Motherboard;
    const ram = {
      id: 3,
      title: 'RAM',
      price: 999,
      attributes: [new ProductDetail('ramType', 'DDR4')],
    } as Ram;
    const graphicCard = {
      id: 4,
      title: 'GPU',
      price: 999,
      attributes: [new ProductDetail('tdp', '250')],
    } as GraphicCard;
    const computerCase = {
      id: 5,
      title: 'Case',
      price: 999,
      attributes: [new ProductDetail('motherboardFormat', 'ATX')],
    } as Case;
    const powerSupply = {
      id: 6,
      title: 'Power supply',
      price: 999,
      attributes: [new ProductDetail('adapterPower', '650')],
    } as PowerSupply;

    computer = {
      motherboard,
      processor,
      ram,
      powerSupply,
      graphicCard,
      case: computerCase,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to products page with correct query params', () => {
    const routerSpy = spyOn(mockRouter, 'navigate');

    component.navigateToProductsPage('laptops', 1);

    expect(routerSpy).toHaveBeenCalledWith(['/categories/laptops'], {
      queryParams: { page: 1, config: true, categoryId: 1 },
    });
  });

  it('should toggle modal', () => {
    expect(component.showModal).toBeFalse();

    component.toggleModal();

    expect(component.showModal).toBeTrue();
  });

  it('should navigate and update cart', () => {
    const serviceSpy = spyOn(service, 'addProductToCart');
    const routerSpy = spyOn(mockRouter, 'navigateByUrl');

    component.customerComputer = computer;
    component.navigateAndUpdateCart();

    expect(routerSpy).toHaveBeenCalledWith('/order/cart');
    expect(serviceSpy).toHaveBeenCalledTimes(6);
  });

  it('should show motherboard and processor socket error', () => {
    let p = computer.processor.attributes?.find(
      (attr) => attr.attributeName === 'motherboardSocket'
    );
    // @ts-ignore
    p.attributeValue = 'AM4';

    component.customerComputer = computer;

    component.sendPcOrder();

    fixture.detectChanges();

    const error = el.nativeElement.querySelector('#socket-compatibility-error');

    expect(error.textContent).toBe(
      'Motherboards socket and processor socket are not compatible'
    );
  });

  it('should show ram and motherboard type error', () => {
    let p = computer.ram.attributes?.find(
      (attr) => attr.attributeName === 'ramType'
    );
    // @ts-ignore
    p.attributeValue = 'DDR3';

    component.customerComputer = computer;

    component.sendPcOrder();

    fixture.detectChanges();

    const error = el.nativeElement.querySelector(
      '#ram-type-compatibility-error'
    );

    expect(error.textContent).toBe(
      'Selected RAM is not compatible with current motherboard'
    );
  });

  it('should show motherboard and case format error', () => {
    let p = computer.motherboard.attributes?.find(
      (attr) => attr.attributeName === 'motherboardFormat'
    );
    // @ts-ignore
    p.attributeValue = 'TRX';

    component.customerComputer = computer;

    component.sendPcOrder();

    fixture.detectChanges();

    const error = el.nativeElement.querySelector('#motherboard-format-error');

    expect(error.textContent).toBe(
      'Selected motherboard will not fit into this case'
    );
  });

  it('should show power requirements error', () => {
    let p = computer.graphicCard.attributes?.find(
      (attr) => attr.attributeName === 'tdp'
    );
    // @ts-ignore
    p.attributeValue = '1500';

    component.customerComputer = computer;

    component.sendPcOrder();

    fixture.detectChanges();

    const error = el.nativeElement.querySelector('#power-requirements-error');

    expect(error.textContent).toBe(
      'Selected power supply have not enough power'
    );
  });

  it('should navigate when computer is complete', () => {
    const componentSpy = spyOn(component, 'navigateAndUpdateCart');

    component.customerComputer = computer;
    component.sendPcOrder();

    expect(componentSpy).toHaveBeenCalled();
  });

  it('should show modal if computer is not complete', () => {
    component.sendPcOrder();

    fixture.detectChanges();

    const completionError = el.nativeElement.querySelector('#completion-modal');

    expect(completionError).toBeTruthy();
    expect(completionError.querySelector('h6').textContent).toBe(
      'There is still missing parts in your build do you want to proceed ?'
    );
  });
});
