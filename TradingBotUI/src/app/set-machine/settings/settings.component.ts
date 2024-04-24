import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule, MatButtonToggleModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  selectedPeriods: string[] = [];
  forecastDays: number = 1;
  maxDaysAmount: number = 90;
  analyzingMethods = this._formBuilder.group({
    sarimax: false,
    ets: false,
    average: false,
  });

  constructor(private _formBuilder: FormBuilder) {}

  public increment() {
    this.forecastDays++;
  }

  public decrement() {
    if (this.forecastDays > 0) {
      this.forecastDays--;
    }
  }

  public manualInput(event: any) {
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
}
