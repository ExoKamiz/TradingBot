import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMachineComponent } from './set-machine.component';

describe('SetMachineComponent', () => {
  let component: SetMachineComponent;
  let fixture: ComponentFixture<SetMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
