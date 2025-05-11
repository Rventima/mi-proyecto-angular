import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  clipboardContent = signal<string>('');
  updateClipboard(content: string){
    this.clipboardContent.set(content);
  }
}
