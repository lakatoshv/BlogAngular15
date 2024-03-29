import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartOptions } from 'src/app/core/models/chart/ChartOptions';
import { ChartOptionsData } from 'src/app/core/data/chart/ChartOptionsData';

@Component({
  selector: 'app-users-activity-chart',
  templateUrl: './users-activity-chart.component.html',
  styleUrls: ['./users-activity-chart.component.css']
})
export class UsersActivityChartComponent implements OnInit {
  /**
   * @param pbgChartContainer ElementRef
   */
  @ViewChild('pbgChartContainer') pbgChartContainer: ElementRef | undefined;

  /**
   * @param chartOptions ChartOptions
   */
  chartOptions: ChartOptions = ChartOptionsData;

  /**
   * @inheritdoc
   */
  ngOnInit(): void {
  }

  /**
   * @inheritdoc
   */
  constructor() {
  }

  /**
   * Select chart item event.
   * @param data any
   */
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  /**
   * Activate chart item event.
   * @param data any
   */
  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  /**
   * Deactivate chart item event.
   * @param data any
   */
  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
