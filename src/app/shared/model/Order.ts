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
