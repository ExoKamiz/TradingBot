import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SetMachineService } from '../set-machine.service';

@Component({
  selector: 'app-upload-new-coin',
  standalone: true,
  imports: [MatIconModule, NgxChartsModule],
  templateUrl: './upload-new-coin.component.html',
  styleUrl: './upload-new-coin.component.scss'
})
export class UploadNewCoinComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;
  isFileSelected: boolean = false;
  chartData: { name: string, series: { name: string, value: number }[] }[] = [];
  
  constructor(
    private cdr: ChangeDetectorRef,
    private setMachineService: SetMachineService,
  ) {}
  
  ngOnInit(): void {
    this.clearChartData();
  }

  ngOnDestroy(): void {

  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.isFileSelected = !!this.selectedFile;
    
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = reader.result?.toString();
      if (text) {
        this.processData(text);
      }
    };

    reader.readAsText(this.selectedFile as Blob);
  }

  private processData(text: string): void {
    const lines = text.split('\n');
    const series = lines.slice(1).filter(line => {
      const columns = line.split(',');
      if (columns.length < 5) {
        console.error(`Invalid data format: ${line}`);
        return false;
      }
      return true;
    }).map(line => {
      const columns = line.split(',');
      return {
        name: columns[0],
        value: +columns[4]
      };
    });
    
    this.chartData = [
      {
        name: 'Series 1',
        series: series
      }
    ];
    console.log(this.chartData);
  }

  clearChartData(): void {
    this.setMachineService.clearChart$.subscribe(() => {
      this.chartData = [];
      this.isFileSelected = false;
      this.selectedFile = null;
      this.cdr.detectChanges();
    });
  }
}