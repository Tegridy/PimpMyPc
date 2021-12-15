export class User {

  constructor(
    public username = '',
    public password = '',
    public firstName = '',
    public lastName = '',
    public address: Address,
    public phone = '',
    public email = '') {
  }
}

export class Address {
  constructor(
    public street = '',
    public city = '',
    public state = '',
    public zip = '') {
  }
}
