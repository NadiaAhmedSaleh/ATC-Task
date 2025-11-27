import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="absolute inset-0 bg-white/30 flex items-center justify-center z-50">
  <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>
  `,
})
export class SpinnerComponent {
  @Input() show = false;
}
