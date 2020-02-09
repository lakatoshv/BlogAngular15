import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild('pbgChartContainer') pbgChartContainer: ElementRef;

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

  data: any[] = [
    {
      name: "Luxembourg",
      series: [
        {
          value: 6953,
          name: "2016-09-21"
        },
        {
          value: 3915,
          name: "2016-09-23"
        },
        {
          value: 6634,
          name: "2016-09-25"
        },
        {
          value: 4421,
          name: "2016-09-26"
        },
        {
          value: 4719,
          name: "2016-09-30"
        },
        
        {
          value: 6953,
          name: "2016-10-02"
        },
        {
          value: 3915,
          name: "2016-10-05"
        },
        {
          value: 6634,
          name: "2016-10-06"
        },
        {
          value: 4421,
          name: "2016-10-09"
        },
        {
          value: 4719,
          name: "2016-10-10"
        }

        {
          value: 6953,
          name: "2016-10-11"
        },
        {
          value: 3915,
          name: "2016-10-12"
        },
        {
          value: 6634,
          name: "2016-10-13"
        },
        {
          value: 4421,
          name: "2016-10-15"
        },
        {
          value: 4719,
          name: "2016-10-17"
        }

        {
          value: 6953,
          name: "2016-10-18"
        },
        {
          value: 3915,
          name: "2016-10-19"
        },
        {
          value: 6634,
          name: "2016-10-20"
        },
        {
          value: 4421,
          name: "2016-10-21"
        },
        {
          value: 4719,
          name: "2016-10-22"
        }

        {
          value: 6953,
          name: "2016-10-23"
        },
        {
          value: 3915,
          name: "2016-10-24"
        },
        {
          value: 6634,
          name: "2016-10-27"
        },
        {
          value: 4421,
          name: "2016-10-28"
        },
        {
          value: 4719,
          name: "2016-10-129"
        }
      ]
    }
  ];

  ngOnInit(): void {
    throw new Error("Method not implemented.");
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
