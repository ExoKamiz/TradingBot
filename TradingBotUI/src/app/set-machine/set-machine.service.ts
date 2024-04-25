import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetMachineService {
  private clearChartSubject: Subject<any> = new Subject<any>(); 
  public clearChart$: Observable<any> = this.clearChartSubject.asObservable();

  private clearSettingsSubject: Subject<any> = new Subject<any>(); 
  public clearSettings$: Observable<any> = this.clearSettingsSubject.asObservable();
  
  constructor() { }

  public onClearChart(): void {
    this.clearChartSubject.next('');
  }

  public onClearSettings(): void {
    this.clearSettingsSubject.next('');
  }
}
