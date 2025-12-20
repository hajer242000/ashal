import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

    constructor(private router: Router) { }

    navigateToRequest(id: string) {
        this.router.navigate(['/application/request', id]);
    }
}
