export interface Filter {
  id: number;
  name: string;
  filterProperty: string;
  values: FilterValue[];
}

export interface FilterValue {
  id: number;
  name: string;
  valueProperty: string;
}
