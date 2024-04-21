import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNewCoinComponent } from './upload-new-coin.component';

describe('UploadNewCoinComponent', () => {
  let component: UploadNewCoinComponent;
  let fixture: ComponentFixture<UploadNewCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadNewCoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadNewCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
