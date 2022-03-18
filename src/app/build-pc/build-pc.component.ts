import {
  Case,
  GraphicCard,
  Motherboard,
  PowerSupply,
  Processor,
  Ram,
} from './../shared/model/BaseProduct';
import { Router } from '@angular/router';
import { Computer } from './../shared/model/Computer';
import { ConfiguratorService } from './../core/services/configurator.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'pmp-build-pc',
  templateUrl: './build-pc.component.html',
  styleUrls: [],
})
export class BuildPcComponent implements OnInit {
  customerComputer!: Computer;
  showModal = false;
  areSocketsCompatible = true;
  areRamCompatible = true;
  motherboardFitInCase = true;
  isPowerSupplySufficient = true;
  params = { config: true, page: 1 };

  constructor(
    private cartService: CartService,
    private configuratorService: ConfiguratorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configuratorService.customerComputer.subscribe((computer) => {
      this.customerComputer = computer;
      console.log(this.customerComputer);
    });
  }

  private checkPartsCompatibility(): void {
    this.areSocketsCompatible = this.checkSocketCompatibility();
    this.areRamCompatible = this.checkRamCompatibility();
    this.motherboardFitInCase = this.checkIfMotherboardCanFitCase();
    this.isPowerSupplySufficient = this.checkPowerRequirements();
  }

  sendPcOrder(): void {
    this.checkPartsCompatibility();
    if (
      this.customerComputer.processor &&
      this.customerComputer.motherboard &&
      this.customerComputer.case &&
      this.customerComputer.graphicCard &&
      this.customerComputer.powerSupply &&
      this.customerComputer.ram
    ) {
      this.router.navigateByUrl('/order/cart');
    } else {
      // Show error
      this.showModal = true;
    }
    console.log(this.customerComputer);
  }

  navigateToProductsPage(name: string): void {
    this.router.navigate(['/categories/' + name], {
      queryParams: this.params,
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  private checkSocketCompatibility(): boolean {
    if (this.customerComputer.motherboard && this.customerComputer.processor) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const processor: Processor = this.customerComputer.processor as Processor;

      return motherboard.motherboardSocket === processor.motherboardSocket;
    } else {
      return false;
    }
  }

  private checkRamCompatibility(): boolean {
    if (this.customerComputer.motherboard && this.customerComputer.ram) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const ram: Ram = this.customerComputer.ram as Ram;

      return motherboard.ramType === ram.ramType;
    } else {
      return false;
    }
  }

  private checkIfMotherboardCanFitCase(): boolean {
    const motherboard: Motherboard = this.customerComputer
      .motherboard as Motherboard;
    const case2: Case = this.customerComputer.case as Case;

    return motherboard.motherboardSocket === case2.motherboardSocket;
  }

  private checkPowerRequirements(): boolean {
    const processor: Processor = this.customerComputer.processor as Processor;
    const graphicCard: GraphicCard = this.customerComputer
      .graphicCard as GraphicCard;
    const powerSupply: PowerSupply = this.customerComputer
      .powerSupply as PowerSupply;

    return powerSupply.adapterPower > processor.tdp + graphicCard.tdp;
  }
}
