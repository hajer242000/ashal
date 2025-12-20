import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilterBarComponent } from '../../../components/filter-bar/filter-bar.component';
import { RecentRequestsTableComponent } from '../../../components/recent-requests-table/recent-requests-table.component';
import { DashboardService } from '../../../core/services/dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import { RecentRequest } from '../../../core/models/dashboard/recent-request.model';
import { UserRole } from '../../../core/models/role.model';

@Component({
    selector: 'app-my-request',
    standalone: true,
    imports: [CommonModule, FilterBarComponent, RecentRequestsTableComponent],
    templateUrl: './my-request.html',
    styleUrls: ['./my-request.css']
})
export class MyRequestComponent implements OnInit {
    requests: RecentRequest[] = [];
    allRequests: RecentRequest[] = [];
    isApplicant = false;

    uniqueGovernorates: string[] = [];
    uniqueRequestTypes: string[] = [];

    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.dashboardService.getRecentRequests().subscribe({
            next: (res) => {
                if (res.success) {
                    this.allRequests = res.data;
                    this.requests = res.data;
                    this.extractUniqueValues();
                }
            },
            error: (err) => console.error(err)
        });

        this.authService.currentUserRole$.subscribe(role => {
            this.isApplicant = role === UserRole.Applicant;
        });
    }

    extractUniqueValues() {
        this.uniqueGovernorates = [...new Set(this.allRequests.map(r => r.governorate))].sort();
        this.uniqueRequestTypes = [...new Set(this.allRequests.map(r => r.requestType))].sort();
    }

    onNewRequest() {
        this.router.navigate(['/application/new-request']);
    }

    onFilterChange(filters: any) {
        console.log('Filters:', filters);

        let filtered = [...this.allRequests];

        // Filter by Status
        if (filters.status && filters.status !== 'All') {
            filtered = filtered.filter(req => req.status === filters.status);
        }

        // Filter by Request Type
        if (filters.requestType && filters.requestType !== 'All') {
            filtered = filtered.filter(req => req.requestType === filters.requestType);
        }

        // Filter by Governorate
        if (filters.governorate && filters.governorate !== 'All') {
            filtered = filtered.filter(req => req.governorate === filters.governorate);
        }

        // Order By
        if (filters.order === 'Newest') {
            filtered.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        } else if (filters.order === 'Oldest') {
            filtered.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
        }

        this.requests = filtered;
    }
}
