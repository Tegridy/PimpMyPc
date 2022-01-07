import {Address} from './User';

export class Order {

  constructor(
    public customerFirstName: string,
    public customerLastName: string,
    public customerPhone: string,
    public customerEmail: string,
    public deliveryAddress: Address) {
  }
}

export interface OrderResponse {

  id: number;
  content: SingleOrder[];


  //
  // constructor(id: number, content: SingleProduct[], orderStatus: string, price: number) {
  //   this.id = id;
  //   this.content = content;
  //   this.orderStatus = orderStatus;
  //   this.price = price;
  // }
}

export interface SingleOrder {
  id: number;
  title: string;
  price: number;
  address: Address;
  imgUrl: string;
  products: any[];
  orderStatus: string;
  orderDate: Date;
}
