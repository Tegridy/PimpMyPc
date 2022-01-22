export class Param {
  key: string;
  value: string | number | boolean;

  constructor(key: string, value: string | number | boolean) {
    this.key = key;
    this.value = value;
  }
}
