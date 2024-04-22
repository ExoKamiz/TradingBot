import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetMachineService {
  private clearChartSubject: Subject<any> = new Subject<any>(); 
  public clearChart$: Observable<any> = this.clearChartSubject.asObservable();
  
  constructor() { }

  public onClearChart(): void {
    this.clearChartSubject.next('');
  }
}
