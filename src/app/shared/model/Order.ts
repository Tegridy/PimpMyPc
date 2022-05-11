import { BaseProduct } from './BaseProduct';
import { Address } from './User';
import { Cart } from './Cart';

export class CustomerOrderDetails {
  constructor(
    public customerFirstName: string,
    public customerLastName: string,
    public customerPhone: string,
    public customerEmail: string,
    public deliveryAddress: Address,
    public cart: Cart
  ) {}
}

export interface OrderResponse {
  id: number;
  content: Order[];
}

export interface Order {
  id: number;
  title: string;
  price: number;
  address: Address;
  imgUrl: string;
  status: string;
  orderDate: Date;
  products: BaseProduct[];
}

export interface OrderDto {
  id: number;
  status: string;
}
