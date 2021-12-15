import {Address} from './User';

export class UserEdit {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public address?: Address,
    public phone?: string,
    public email?: string,
    public password?: string) {
  }


  set setAddress(value: Address) {
    this.address = value;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  set setPhone(value: string) {
    this.phone = value;
  }

  set setEmail(value: string) {
    this.email = value;
  }
}
