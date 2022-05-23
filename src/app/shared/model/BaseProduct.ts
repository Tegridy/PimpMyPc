import { ProductCategory } from './ProductCategory';
import { ProductDetail } from './ProductDetail';

export interface BaseProduct {
  id: number;
  title: string;
  description?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  price: number;
  attributes?: ProductDetail[];
  categories?: ProductCategory[];
}

export interface Motherboard extends BaseProduct {
  motherboardSocket: string;
  motherboardFormat: string;
  ramType: string;
}

export interface Processor extends BaseProduct {
  tdp: string;
  motherboardSocket: string;
}

export interface Ram extends BaseProduct {
  moduleType: string;
}

export interface Case extends BaseProduct {
  motherboardFormat: string;
}

export interface PowerSupply extends BaseProduct {
  adapterPower: string;
}

export interface GraphicCard extends BaseProduct {
  tdp: string;
}
