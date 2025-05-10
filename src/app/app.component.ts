import { Component } from '@angular/core';
import { TextClipboardComponent } from './text-clipboard/text-clipboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TextClipboardComponent],
  template: `
    <div class="container">
      <h1>Editor de Texto</h1>
      <app-text-clipboard></app-text-clipboard>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 20px;
      box-sizing: border-box;
    }
    
    h1 {
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {}