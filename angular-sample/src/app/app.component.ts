import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RealmapComponent } from './realmap/realmap.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RealmapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-sample';
  config = {
    title: {
      text: '시군구별 인구 밀도',
      align: 'left',
      style: {
        fontSize: '15pt',
        fontWeight: '700',
      },
    },
    map: [
      {
        url: '/kr-sigun-low.geo.json',
        source: null,
      },
    ],
    body: {
      projection: 'mercator',
      zoomable: true,
    },
    colorScale: {
      location: 'right',
      steps: [
        { from: 0, to: 50, color: '#d5deef', label: '' },
        { from: 50, to: 250, color: '#b1c9ef', label: '' },
        { from: 250, to: 500, color: '#8aaee0', label: '' },
        { from: 500, to: 1000, color: '#628ecb', label: '' },
        { from: 1000, to: 5000, color: '#395886', label: '' },
        { from: 5000, color: '#395886', label: '' },
      ],
    },
    series: [
      {
        name: '지도',
        dataUrl: '/kr-sigun-population-density.json',
        tooltipText: [
          '<t style="font-size: 18px; font-weight: 700;">${sido} ${name}</t>',
          '인구 밀도: <t style="font-weight: 700;">${value}</t>',
        ].join('<br />'),
        hoverColor: '#FBDEB5',
        style: {
          stroke: '#fff',
          strokeWidth: '0.5',
        },
      },
    ],
  };
}
