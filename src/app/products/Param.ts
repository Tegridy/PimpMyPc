export class Param {
  id?: number;
  key: string;
  value: string | number;

  constructor(key: string, value: string | number, id?: number) {
    this.key = key;
    this.value = value;
    this.id = id;
  }
}
