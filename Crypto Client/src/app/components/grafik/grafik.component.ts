import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-grafik',
  templateUrl: './grafik.component.html',
  styleUrls: ['./grafik.component.css']
})
export class GrafikComponent implements OnInit {
  //@ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> |any;
  @Input() podaci:Array<number> =[];
  @Input() color:string='';
constructor() 
{
  
}

  ngOnInit() 
  {
    this.chartOptions = {
      series: [
        {
  
          data: this.podaci
        }
      ],
      chart: {
        height: 30,
        type: "line",
        sparkline: {
          enabled: true
        }
      },
      stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: this.color,
      width: 2,
      dashArray: 0,      
  },
  tooltip: {
    enabled: false,}
    };
  }

}
