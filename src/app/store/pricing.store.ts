import { signal } from '@angular/core';
import { PricingRow } from '../models/pricing.model';

export class PricingStore {
  columns = signal<string[]>([]);
  rows = signal<PricingRow[]>([]);

  updateCell(rowIndex: number, colIndex: number, value: number) {
    this.rows.update(rows => {
      const newRows = [...rows];
      newRows[rowIndex] = { ...newRows[rowIndex], values: [...newRows[rowIndex].values] };
      newRows[rowIndex].values[colIndex] = value;
      return newRows;
    });
  }

  addColumn() {
    this.columns.update(cols => [...cols, `Column ${cols.length + 1}`]);
    this.rows.update(rows => rows.map(row => ({ ...row, values: [...row.values, 0] })));
  }

  removeColumn() {
    if (this.columns().length > 1) {
      this.columns.update(cols => cols.slice(0, -1));
      this.rows.update(rows => rows.map(row => ({ ...row, values: row.values.slice(0, -1) })));
    }
  }

  addRow() {
    this.rows.update(rows => [...rows, { label: `Row ${rows.length + 1}`, values: new Array(this.columns().length).fill(0) }]);
  }

  setData(columns: string[], rows: PricingRow[]) {
    this.columns.set(columns);
    this.rows.set(rows);
  }

  removeRow() {
    if (this.rows().length > 1) {
      this.rows.update(rows => rows.slice(0, -1));
    }
  }
}

export const pricingStore = new PricingStore();