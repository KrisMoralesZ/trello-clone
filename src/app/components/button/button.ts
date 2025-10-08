import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '@models/colors.model';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
})
export class Button {
  @Input() typeButton: 'button' | 'reset' | 'submit' = 'button';
  @Input() loading = false;
  @Input() color: Colors = 'primary';
  @Input() disabled = false;

  private mapColors = COLORS;

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
