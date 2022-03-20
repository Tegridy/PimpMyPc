import { Computer } from './../../shared/model/Computer';
import { Injectable } from '@angular/core';
import {
  BaseProduct,
  Case,
  GraphicCard,
  Motherboard,
  PowerSupply,
  Processor,
  Ram,
} from 'src/app/shared/model/BaseProduct';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private computer: Computer = {} as Computer;

  private customerComputerSource = new BehaviorSubject<Computer>(this.computer);
  customerComputer = this.customerComputerSource.asObservable();

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  addPart(productId: number): void {
    this.productsService.getProductById(productId).subscribe((product) => {
      if (product.categories) {
        switch (product.categories[0].title) {
          case 'Motherboards':
            this.computer.motherboard = product as Motherboard;
            break;
          case 'Processors':
            this.computer.processor = product as Processor;
            break;
          case 'Memory RAM':
            this.computer.ram = product as Ram;
            break;
          case 'Cases':
            this.computer.case = product as Case;
            break;
          case 'Graphic cards':
            this.computer.graphicCard = product as GraphicCard;
            break;
          case 'Power supply':
            this.computer.powerSupply = product as PowerSupply;
            break;
        }
        this.updateCustomerComputer(this.computer);
      }
    });
  }

  private updateCustomerComputer(computer: Computer): void {
    this.customerComputerSource.next(computer);
  }
}
