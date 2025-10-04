import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '@models/colors.model';

@Component({
  selector: 'app-card-color',
  imports: [CommonModule],
  templateUrl: './card-color.html',
})
export class CardColor {
  @Input() color: Colors = 'sky';

  mapColors = COLORS;

  get colors() {
    const classes = this.mapColors[this.color];
    return classes ? classes : {};
  }
}
