import { Component, signal } from '@angular/core';
import { PricingTableComponent } from './components/pricing-table/pricing-table.component';

@Component({
  selector: 'app-root',
  imports: [PricingTableComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('dynamic-pricing-ui');
}
