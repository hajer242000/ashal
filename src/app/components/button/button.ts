import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.html',
    styleUrl: './button.css',
})
export class AppButton {
    @Input() label = '';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() variant: 'primary' | 'outline' | 'green' = 'primary';
    @Input() disabled = false;

    @Output() onClick = new EventEmitter<Event>();

    handleClick(event: Event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
    }
}
