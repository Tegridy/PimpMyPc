import {Computer} from './../../shared/model/Computer';
import {Injectable} from '@angular/core';
import {BaseProduct} from 'src/app/shared/model/BaseProduct';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private computer: Computer = {} as Computer;

  private customerComputerSource = new BehaviorSubject<Computer>(this.computer);
  customerComputer = this.customerComputerSource.asObservable();

  constructor() {
  }

  addPart(product: BaseProduct) {
    if (product.categories) {
      switch (product.categories[0].name) {
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
    }
  }

  private updateCustomerComputer(computer: Computer) {
    this.customerComputerSource.next(computer);
  }
}
