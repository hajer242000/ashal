import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../../core/services/dashboard.service';
import { RecentRequest } from '../../../core/models/dashboard/recent-request.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.html',
})
export class DashboardComponent {
    recentRequests: RecentRequest[] = [];

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.dashboardService.getRecentRequests().subscribe({
            next: (res) => {
                if (res.success) {
                    this.recentRequests = res.data;
                }
            },
            error: (err) => console.error('Failed to load requests', err)
        });
    }
}
