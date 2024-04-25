import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadNewCoinComponent } from "./upload-new-coin/upload-new-coin.component";
import { SettingsComponent } from "./settings/settings.component";
import { SetMachineService } from './set-machine.service';

@Component({
    selector: 'app-set-machine',
    standalone: true,
    templateUrl: './set-machine.component.html',
    styleUrl: './set-machine.component.scss',
    imports: [UploadNewCoinComponent, SettingsComponent]
})
export class SetMachineComponent implements OnInit, OnDestroy {
    constructor(
        private setMachineService: SetMachineService,
    ) {}

    ngOnInit(): void {
    
    }
  
    ngOnDestroy(): void {
  
    }

    clearChart(): void {
        this.setMachineService.onClearChart();
    }

    clearSettings(): void {
        this.setMachineService.onClearSettings();
    }
}
