import { Injectable } from '@angular/core';
import data from '../assets/Pricing.json' assert { type: 'json' };
import { PricingRow, PricingTable } from '../models/pricing.model';

interface RawPricingItem {
  name?: string;
  prices?: number[];
  sizes?: Record<string, number[]>;
  additional?: { type: 'fixed' | 'percentage'; value: number };
}

interface RawPricingData {
  items?: RawPricingItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  async loadPricingData(): Promise<PricingTable> {
    return this.transformData();
  }

  async transformData(): Promise<PricingTable> {
    const raw = data as RawPricingData;

    const items = raw.items ?? [];
    if (items.length === 0) {
      return {
        columns: ['Tier 1', 'Tier 2'],
        rows: [{ label: 'Empty Item', values: [0, 0] }]
      };
    }

    const rows: PricingRow[] = [];
    let maxColumns = 0;

    for (const item of items) {
      if (item.sizes && typeof item.sizes === 'object') {
        // Size-based pricing: create rows for each size
        for (const [size, prices] of Object.entries(item.sizes)) {
          const label = `${item.name ?? 'Unknown Item'} - ${size}`;
          const values = Array.isArray(prices) ? prices.filter(v => typeof v === 'number' && Number.isFinite(v)) : [];
          rows.push({ label, values });
          maxColumns = Math.max(maxColumns, values.length);
        }
      } else if (item.prices && Array.isArray(item.prices)) {
        // Flat pricing: single row
        const label = item.name ?? 'Unknown Item';
        const values = item.prices.filter(v => typeof v === 'number' && Number.isFinite(v));
        rows.push({ label, values });
        maxColumns = Math.max(maxColumns, values.length);
      }

      // Additional charges: apply to flat pricing if present
      if (item.additional && item.prices && Array.isArray(item.prices)) {
        const finalValues = item.prices.map(price => {
          if (item.additional!.type === 'fixed') {
            return price + item.additional!.value;
          } else if (item.additional!.type === 'percentage') {
            return price * (1 + item.additional!.value / 100);
          }
          return price;
        }).filter(v => Number.isFinite(v));
        rows.push({ label: `${item.name ?? 'Unknown Item'} (Final)`, values: finalValues });
        maxColumns = Math.max(maxColumns, finalValues.length);
      }
    }

    // Pad all rows to maxColumns with 0
    for (const row of rows) {
      while (row.values.length < maxColumns) {
        row.values.push(0);
      }
    }

    const columns = Array.from({ length: maxColumns }, (_, index) => `Tier ${index + 1}`);

    const transformed = { columns, rows };
    return transformed;
  }
}