// text-clipboard.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardService } from './clipboard.service';

@Component({
  selector: 'app-text-clipboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="text-area-container">
      <textarea
        [(ngModel)]="textContent"
        (ngModelChange)="updateText($event)"
        placeholder="Escribe aquí tu texto..."
        class="text-area"
      ></textarea>  
    </div>
  `


})
export class TextClipboardComponent {

  constructor(private clipboardService: ClipboardService){}

  textContent = signal('');
  
  updateText(value: string) {
    this.textContent.set(value);
    this.clipboardService.updateClipboard(this.textContent()); // enviar señal

  }


}