import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, viewChild } from '@angular/core';
import { createChartAsync } from 'realmap';

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

    get styles() {
        return {
            width: this.width + 'px',
            height: this.height + 'px',
        }
    }

    ngAfterViewInit() {
        createChartAsync(document, this.realmapRef.nativeElement, this.config);
    }
}
