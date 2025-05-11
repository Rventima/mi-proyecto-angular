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
      <button 
        (click)="copyToClipboard()" 
        class="copy-button"
        [class.copied]="hasCopied()"
        [attr.aria-live]="hasCopied() ? 'polite' : 'off'"
        [attr.aria-label]="hasCopied() ? 'Texto copiado' : 'Copiar texto'"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 

        >
          @if (!hasCopied()) {
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          } @else {
            <path d="M20 6L9 17l-5-5"></path>
          }
        </svg>
      </button>
      
    </div>
  `,
  styles: [`

    .copy-button {
      position: absolute;
      top: -10px;
      right: 10px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      transition: all 0.1s ease;
    }
    
    .copy-button:hover {
      background-color: #f0f0f0;
    }
    
    .copy-button.copied {
      background-color: #4CAF50;
      color: white;
      border-color: #4CAF50;
    }

  `]

})
export class TextClipboardComponent {

  constructor(private clipboardService: ClipboardService){}

  textContent = signal('');
  hasCopied = signal(false);
  
  updateText(value: string) {
    this.textContent.set(value);
    this.clipboardService.updateClipboard(this.textContent()); // enviar señal

    // Reset the copied state when text changes
    if (this.hasCopied()) {
      this.hasCopied.set(false);
    }
  }


  copyToClipboard() {
    // Solo copiar si hay contenido
    if (this.textContent().trim()) {
      navigator.clipboard.writeText(this.textContent())
        .then(() => {
          this.hasCopied.set(true);

          // Resetear el estado de copiado después de 2 segundos
          setTimeout(() => {
            this.hasCopied.set(false);
          }, 2000);
        })
        .catch(err => {
          console.error('Error al copiar al portapapeles:', err);
        });
    }
  }


}