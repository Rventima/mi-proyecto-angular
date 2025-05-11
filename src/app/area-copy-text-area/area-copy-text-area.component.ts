import { Component, signal, effect } from '@angular/core';
import { ClipboardService } from '../text-clipboard/clipboard.service';

@Component({
  selector: 'app-area-copy-text-area',
  imports: [],
  standalone: true,
  template: `
    <textarea
      class="text-area"
      disabled
      [value] = "newText()"
    ></textarea>
    <button 
        (click)="copyToClipboard()" 
        class="copy-button"
        [class.copied]="hasCopied()"
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
export class AreaCopyTextAreaComponent {
  newText = signal('');
  hasCopied = signal(false);

  constructor(private clipboardService: ClipboardService){
    effect(() =>{
      const textTransformed = this.transformText(this.clipboardService.clipboardContent());
      this.newText.set(textTransformed);
    });
  }

  private receiveServiceText(serviceText: string): string{
    return this.transformText(serviceText);
  }

  private transformText(text: string){
    return this.rot13(text);
  }

  private rot13(str: string): string {
    return str.replace(/[a-zA-Z]/g, char => {
      const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      return String.fromCharCode(base + (char.charCodeAt(0) - base + 13) % 26);
    });
  }

  copyToClipboard() {
    // Solo copiar si hay contenido
    if (this.newText().trim()) {
      navigator.clipboard.writeText(this.newText())
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
