import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SetMachineService } from '../set-machine.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule, MatButtonToggleModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  analyzingMethods = this._formBuilder.group({
    sarimax: false,
    ets: false,
    average: false,
  });
  selectedPeriods: string[] = [];
  forecastDays: number = 1;
  maxDaysAmount: number = 90;
  private subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private setMachineService: SetMachineService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.clearSettingsData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public increment(): void {
    this.forecastDays++;
  }

  public decrement(): void {
    if (this.forecastDays > 0) {
      this.forecastDays--;
    }
  }

  public manualInput(event: any): void {
    const inputValue = parseInt(event.target.value);

    if (!isNaN(inputValue)) {
      this.forecastDays = inputValue;
    }
  }

  public focusOut(): void {
    if (this.forecastDays > this.maxDaysAmount) {
      this.forecastDays = this.maxDaysAmount;
    } 
    else if (this.forecastDays < 1){
      this.forecastDays = 1;
    }
  }

  clearSettingsData(): void {
    this.subscription.add(
      this.setMachineService.clearSettings$.subscribe(() => {
        this.selectedPeriods = [];
        this.forecastDays = 1;
        this.analyzingMethods.setValue({
          sarimax: false,
          ets: false,
          average: false,
        });
        this.cdr.detectChanges();
      })
    );
  }
}
