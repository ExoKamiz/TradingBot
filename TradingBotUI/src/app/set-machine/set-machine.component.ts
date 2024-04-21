import { Component } from '@angular/core';
import { UploadNewCoinComponent } from "./upload-new-coin/upload-new-coin.component";
import { SettingsComponent } from "./settings/settings.component";

@Component({
    selector: 'app-set-machine',
    standalone: true,
    templateUrl: './set-machine.component.html',
    styleUrl: './set-machine.component.scss',
    imports: [UploadNewCoinComponent, SettingsComponent]
})
export class SetMachineComponent {

}
