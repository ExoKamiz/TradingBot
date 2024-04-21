import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '../../../services/image-manager.service';

@Component({
  selector: 'app-upload-new-coin',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './upload-new-coin.component.html',
  styleUrl: './upload-new-coin.component.scss'
})
export class UploadNewCoinComponent implements OnInit, OnDestroy {
  constructor() {}
  
  ngOnInit() {
    
  }

  ngOnDestroy() {
    // Cleanup code here
  }

  public onFileSelected(event: any): void {
    // Code to handle the selected file
    const file: File = event.target.files[0];
    // Further processing of the file
  }
}
