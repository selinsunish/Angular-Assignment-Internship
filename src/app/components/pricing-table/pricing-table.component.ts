import { Component, inject, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { pricingStore } from '../../store/pricing.store';
import { PricingService } from '../../services/pricing.service';

@Component({
  standalone: true,
  selector: 'app-pricing-table',
  imports: [CommonModule],
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingTableComponent implements OnInit {
  private pricingService = inject(PricingService);
  store = pricingStore;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const result = await this.pricingService.transformData();
        this.store.setData(result.columns, result.rows);
      } catch (error) {
        console.error('Failed to load pricing data', error);
      }
    }
  }

  updateCell(rowIndex: number, colIndex: number, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const value = inputValue === '' ? 0 : +inputValue;
    this.store.updateCell(rowIndex, colIndex, isNaN(value) ? 0 : value);
  }

  removeColumn() {
    if (confirm('Are you sure you want to remove the last column?')) {
      this.store.removeColumn();
    }
  }
}