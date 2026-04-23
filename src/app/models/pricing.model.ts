export interface PricingRow {
  label: string;
  values: number[];
}

export interface PricingTable {
  columns: string[];
  rows: PricingRow[];
}