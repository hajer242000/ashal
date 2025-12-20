import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentRequest } from '../../core/models/dashboard/recent-request.model';

@Component({
    selector: 'app-recent-requests-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recent-requests-table.component.html',
    styleUrl: './recent-requests-table.component.css'
})
export class RecentRequestsTableComponent {
    @Input() requests: RecentRequest[] = [];
}
