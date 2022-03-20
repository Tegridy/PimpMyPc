import {
  BaseProduct,
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
    });
  }

  sendPcOrder(): void {
    this.checkPartsCompatibility();

    if (!this.canProceed()) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else if (this.isComputerComplete() && this.canProceed()) {
      this.navigateAndUpdateCart();
    } else if (!this.isComputerComplete()) {
      this.showModal = true;
    }
  }

  private checkPartsCompatibility(): void {
    this.checkSocketCompatibility();
    this.checkRamCompatibility();
    this.checkIfMotherboardCanFitCase();
    this.checkPowerRequirements();
  }

  private isComputerComplete(): boolean {
    if (
      this.customerComputer.processor &&
      this.customerComputer.motherboard &&
      this.customerComputer.case &&
      this.customerComputer.graphicCard &&
      this.customerComputer.powerSupply &&
      this.customerComputer.ram
    ) {
      return true;
    } else {
      return false;
    }
  }

  navigateToProductsPage(name: string): void {
    this.router.navigate(['/categories/' + name], {
      queryParams: this.params,
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  private checkSocketCompatibility(): void {
    if (this.customerComputer.motherboard && this.customerComputer.processor) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const processor: Processor = this.customerComputer.processor as Processor;

      this.areSocketsCompatible =
        motherboard.motherboardSocket === processor.motherboardSocket;
    }
  }

  private checkRamCompatibility(): void {
    if (this.customerComputer.motherboard && this.customerComputer.ram) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const ram: Ram = this.customerComputer.ram as Ram;

      this.areRamCompatible = motherboard.ramType === ram.moduleType;
    }
  }

  private checkIfMotherboardCanFitCase(): void {
    if (this.customerComputer.motherboard && this.customerComputer.case) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const computerCase: Case = this.customerComputer.case as Case;

      this.motherboardFitInCase = computerCase.motherboardFormats.includes(
        motherboard.motherboardFormat
      );
    }
  }

  private checkPowerRequirements(): void {
    if (
      this.customerComputer.processor &&
      this.customerComputer.graphicCard &&
      this.customerComputer.powerSupply
    ) {
      const processor: Processor = this.customerComputer.processor as Processor;
      const processorWattage = Number(processor.tdp.replace(' W', ''));

      const graphicCard: GraphicCard = this.customerComputer
        .graphicCard as GraphicCard;
      const graphicCardWattage = Number(graphicCard.tdp.replace(' W', ''));

      const powerSupply: PowerSupply = this.customerComputer
        .powerSupply as PowerSupply;
      const powerSupplyWattage = Number(
        powerSupply.adapterPower.replace(' W', '')
      );

      this.isPowerSupplySufficient =
        powerSupplyWattage > processorWattage + graphicCardWattage;
    }
  }

  private canProceed(): boolean {
    return (
      this.areSocketsCompatible &&
      this.areRamCompatible &&
      this.motherboardFitInCase &&
      this.isPowerSupplySufficient
    );
  }

  navigateAndUpdateCart(): void {
    Object.values(this.customerComputer).forEach((part: BaseProduct) =>
      this.cartService.addProductToCart(part)
    );

    this.router.navigateByUrl('/order/cart');
  }
}
