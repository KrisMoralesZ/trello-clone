import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  @Input() typeButton: 'button' | 'reset' | 'submit' = 'button';
  @Input() loading = false;
}
