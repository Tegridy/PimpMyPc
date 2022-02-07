import { Address } from './User';

export class Order {
  constructor(
    public customerFirstName: string,
    public customerLastName: string,
    public customerPhone: string,
    public customerEmail: string,
    public deliveryAddress: Address
  ) {}
}

export interface OrderResponse {
  id: number;
  content: SingleOrder[];
}

export interface SingleOrder {
  id: number;
  title: string;
  price: number;
  address: Address;
  imgUrl: string;
  products: any[];
  status: string;
  orderDate: Date;
}

export interface OrderDto {
  id: number;
  status: string;
}
