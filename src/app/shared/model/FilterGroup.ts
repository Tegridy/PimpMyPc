export interface FilterGroup {
  id: number;
  name: string;
  filterProperty: string;
  values: Filter[];
}

export interface Filter {
  id?: number;
  name: string;
  valueProperty: string | number;
  isChecked: boolean;
}
