import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { createChartAsync, MapChart } from 'realmap';

@Component({
  selector: 'app-realmap',
  imports: [CommonModule],
  templateUrl: './realmap.component.html',
  styleUrl: './realmap.component.css'
})
export class RealmapComponent {
    @Input()
    config: any;

    @Input()
    width: number = 600;

    @Input()
    height: number = 500;

    @ViewChild('realmap')
    realmapRef!: ElementRef<HTMLDivElement>;

    private chart?: MapChart;

    get styles() {
        return {
            width: this.width + 'px',
            height: this.height + 'px',
        }
    }

    async ngAfterViewInit() {
        this.chart = await createChartAsync(document, this.realmapRef.nativeElement, this.config);
    }

    // 컴포넌트가 파괴될 때 차트가 등록한 리스너·export 버튼 DOM 등을 정리한다.
    ngOnDestroy() {
        this.chart?.destroy();
    }
}
