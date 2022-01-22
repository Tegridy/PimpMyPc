import {
  Motherboard,
  Processor,
  Ram,
  Case,
  GraphicCard,
  PowerSupply,
} from './../shared/model/BaseProduct';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Computer } from './../shared/model/Computer';
import { ConfiguratorService } from './../core/services/configurator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-build-pc',
  templateUrl: './build-pc.component.html',
  styleUrls: ['./build-pc.component.scss'],
})
export class BuildPcComponent implements OnInit {
  customerComputer!: Computer;
  showModal: boolean = false;
  areSocketsCompatible = true;
  areRamCompatible = true;
  motherboardFitInCase = true;
  isPowerSupplySufficient = true;
  params = { config: true, page: 1 };

  constructor(
    private configuratorService: ConfiguratorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configuratorService.customerComputer$.subscribe((computer) => {
      this.customerComputer = computer;
      this.checkPartsCompatibility();
    });
  }

  private checkPartsCompatibility() {
    this.areSocketsCompatible = this.checkSocketCompatibility();
    this.areRamCompatible = this.checkRamCompatibility();
    this.motherboardFitInCase = this.checkIfMotherboardCanFitCase();
    this.isPowerSupplySufficient = this.checkPowerRequirements();
  }

  sendPcOrder(): void {
    if (
      this.customerComputer.processor &&
      this.customerComputer.motherboard &&
      this.customerComputer.case &&
      this.customerComputer.graphicCard &&
      this.customerComputer.powerSupply &&
      this.customerComputer.ram
    ) {
      // Send order to backend
    } else {
      // Show error
      this.showModal = true;
    }
    console.log(this.customerComputer);
  }

  navigateToProductsPage(name: string) {
    this.router.navigate(['/categories/' + name], {
      queryParams: this.params,
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  private checkSocketCompatibility(): boolean {
    const motherboard: Motherboard = this.customerComputer
      .motherboard as Motherboard;
    const processor: Processor = this.customerComputer.processor as Processor;

    return motherboard.motherboardSocket === processor.motherboardSocket;
  }

  private checkRamCompatibility(): boolean {
    const motherboard: Motherboard = this.customerComputer
      .motherboard as Motherboard;
    const ram: Ram = this.customerComputer.ram as Ram;

    return motherboard.ramType === ram.ramType;
  }

  private checkIfMotherboardCanFitCase() {
    const motherboard: Motherboard = this.customerComputer
      .motherboard as Motherboard;
    const case2: Case = this.customerComputer.case as Case;

    return motherboard.motherboardSocket === case2.motherboardSocket;
  }

  private checkPowerRequirements() {
    const processor: Processor = this.customerComputer.processor as Processor;
    const graphicCard: GraphicCard = this.customerComputer
      .graphicCard as GraphicCard;
    const powerSupply: PowerSupply = this.customerComputer
      .powerSupply as PowerSupply;

    return powerSupply.adapterPower > processor.tdp + graphicCard.tdp;
  }
}
