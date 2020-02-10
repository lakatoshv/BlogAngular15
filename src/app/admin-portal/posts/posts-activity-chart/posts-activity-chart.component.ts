import { ChartData } from './../../../core/data/chartdata';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-posts-activity-chart',
  templateUrl: './posts-activity-chart.component.html',
  styleUrls: ['./posts-activity-chart.component.css']
})
export class PostsActivityChartComponent implements OnInit {
  @ViewChild('pbgChartContainer') pbgChartContainer: ElementRef;

  data: any[] = ChartData;
  view: any[] = [1600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  ngOnInit(): void {
  } 

  constructor() {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
