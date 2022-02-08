import { Product } from './../../shared/model/Product';
import { Computer } from './../../shared/model/Computer';
import { Injectable } from '@angular/core';
import { BaseProduct } from 'src/app/shared/model/BaseProduct';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private computer: Computer = {} as Computer;

  private customerComputerSource = new BehaviorSubject<Computer>(this.computer);
  customerComputer$ = this.customerComputerSource.asObservable();

  constructor() {}

  addPart(product: BaseProduct) {
    if (product.categories) {
      console.log(product.categories[0].title);
      switch (product.categories[0].title) {
        case 'Motherboards':
          this.computer.motherboard = product;
          break;
        case 'Processors':
          this.computer.processor = product;
          break;
        case 'Memory RAM':
          this.computer.ram = product;
          break;
        case 'Cases':
          this.computer.case = product;
          break;
        case 'Graphic cards':
          this.computer.graphicCard = product;
          break;
        case 'Power supply':
          this.computer.powerSupply = product;
          break;
      }
      this.updateCustomerComputer(this.computer);
    } else {
      console.log('Product has no category');
    }
    console.log(this.computer);
  }

  private updateCustomerComputer(computer: Computer) {
    this.customerComputerSource.next(computer);
  }
}