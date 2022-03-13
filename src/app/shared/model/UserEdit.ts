import {Address} from './User';

export class UserEdit {
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string
  ) {
  }
}

export class UserEditAddress {
  constructor(public address: Address) {
  }
}

export class UserEditAuth {
  constructor(public password: string) {
  }
}
