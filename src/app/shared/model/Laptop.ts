import {BaseProduct} from './BaseProduct';

export interface Laptop extends BaseProduct {

  displaySize?: number;
  screenResolution?: string;
  panelType?: string;
  processor?: string;
  cpuSpeed?: number;
  ram?: number;
  ramType?: string;
  graphicCard?: string;
  graphicCardMemory?: number;
  operatingSystem?: string;
  hardDiscType?: string;
  hardDiscCapacity?: number,
  weight?: number;
}
