import { Component } from '@angular/core';
import { TextClipboardComponent } from './text-clipboard/text-clipboard.component';
import { AreaCopyTextAreaComponent } from "./area-copy-text-area/area-copy-text-area.component";
import { ClipboardService } from './text-clipboard/clipboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TextClipboardComponent, AreaCopyTextAreaComponent],
  template: `
    <h1>Texto</h1>
    <div class="areas-container">
      <app-text-clipboard></app-text-clipboard>
      <app-area-copy-text-area></app-area-copy-text-area>
    </div>
  `,
  styles: [`
    h1 {
      margin-bottom: 20px;
    }

  `],
  providers: [ClipboardService]
})
export class AppComponent {}