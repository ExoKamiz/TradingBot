import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  forecastDays: number = 0;

  increment() {
    this.forecastDays++;
  }

  decrement() {
    if (this.forecastDays > 0) {
      this.forecastDays--;
    }
  }

  manualInput(event: any) {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue)) {
      this.forecastDays = inputValue;
    }
  }
}
