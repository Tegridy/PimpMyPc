import { Category } from './Category';
export interface BaseProduct {
  id: number;
  title: string;
  description?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  price: number;
  categories?: Category[];
}

export interface Motherboard extends BaseProduct {
  motherboardSocket: string;
  ramType: string;
}

export interface Processor extends BaseProduct {
  tdp: string;
  motherboardSocket: string;
}

export interface Ram extends BaseProduct {
  ramType: string;
}

export interface Case extends BaseProduct {
  motherboardSocket: string;
}

export interface PowerSupply extends BaseProduct {
  adapterPower: string;
}

export interface GraphicCard extends BaseProduct {
  tdp: string;
}
