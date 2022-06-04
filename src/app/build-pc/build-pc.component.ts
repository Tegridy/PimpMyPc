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

  navigateToProductsPage(name: string, catId: number): void {
    this.router.navigate(['/categories/' + name], {
      queryParams: { page: 1, config: true, categoryId: catId },
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  private checkSocketCompatibility(): void {
    if (this.customerComputer.motherboard && this.customerComputer.processor) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const motherboardSocket = motherboard.attributes?.find(
        (name) => name.attributeName === 'motherboardSocket'
      );

      const processor: Processor = this.customerComputer.processor as Processor;
      const processorSocket = processor.attributes?.find(
        (name) => name.attributeName === 'motherboardSocket'
      );

      this.areSocketsCompatible =
        motherboardSocket?.attributeValue === processorSocket?.attributeValue;
    }
  }

  private checkRamCompatibility(): void {
    if (this.customerComputer.motherboard && this.customerComputer.ram) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const motherboardRamType = motherboard.attributes?.find(
        (name) => name.attributeName === 'ramType'
      );

      const ram: Ram = this.customerComputer.ram as Ram;
      const ramType = ram.attributes?.find(
        (name) => name.attributeName === 'moduleType'
      );

      this.areRamCompatible =
        motherboardRamType?.attributeValue === ramType?.attributeValue;
    }
  }

  private checkIfMotherboardCanFitCase(): void {
    if (this.customerComputer.motherboard && this.customerComputer.case) {
      const motherboard: Motherboard = this.customerComputer
        .motherboard as Motherboard;
      const motherboardFormat = motherboard.attributes?.find(
        (name) => name.attributeName === 'motherboardFormat'
      );

      const computerCase: Case = this.customerComputer.case as Case;
      const caseMotherboardFormat = computerCase.attributes?.find(
        (name) => name.attributeName === 'motherboardFormat'
      );

      this.motherboardFitInCase =
        motherboardFormat?.attributeValue ===
        caseMotherboardFormat?.attributeValue;
    }
  }

  private checkPowerRequirements(): void {
    if (
      this.customerComputer.processor &&
      this.customerComputer.graphicCard &&
      this.customerComputer.powerSupply
    ) {
      const processor: Processor = this.customerComputer.processor as Processor;
      let processorWattage = processor.attributes?.find(
        (name) => name.attributeName === 'tdp'
      )?.attributeValue;

      if (processorWattage === undefined) {
        processorWattage = '100';
      }

      const graphicCard: GraphicCard = this.customerComputer
        .graphicCard as GraphicCard;
      let graphicCardWattage = graphicCard.attributes?.find(
        (name) => name.attributeName === 'tdp'
      )?.attributeValue;

      if (graphicCardWattage === undefined) {
        graphicCardWattage = '200';
      }

      const powerSupply: PowerSupply = this.customerComputer
        .powerSupply as PowerSupply;
      const powerSupplyWattage = powerSupply.attributes?.find(
        (name) => name.attributeName === 'adapterPower'
      )?.attributeValue;

      this.isPowerSupplySufficient =
        Number(powerSupplyWattage) >
        Number(processorWattage) + Number(graphicCardWattage);
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
    Object.values(this.customerComputer).forEach((part: BaseProduct) => {
      this.cartService.addProductToCart(part);
    });

    this.router.navigateByUrl('/order/cart');
  }
}
