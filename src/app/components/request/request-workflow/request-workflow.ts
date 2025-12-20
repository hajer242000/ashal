import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-request-workflow',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './request-workflow.html'
})
export class RequestWorkflowComponent {
    @Input() steps: any[] = [];
}
