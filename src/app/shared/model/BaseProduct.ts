export interface BaseProduct {
  id: number;
  createdAt?: any;
  modifiedAt?: any;

  title: string;
  description?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  price: number;
  quantity: number;
}
