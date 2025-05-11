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
  
  `,
  styles: [`
      
    `]
})
export class AreaCopyTextAreaComponent {
  newText = signal('');

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
}
