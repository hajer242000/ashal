import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DashboardService } from '../../../core/services/dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import { RecentRequest } from '../../../core/models/dashboard/recent-request.model';
import { DashboardStats } from '../../../core/models/dashboard/dashboard-stats.model';
import { Notification } from '../../../core/models/dashboard/notification.model';
import { QuickAction } from '../../../core/models/dashboard/quick-action.model';
import { ActionRequired } from '../../../core/models/dashboard/action-required.model';
import { MonthlyData } from '../../../core/models/dashboard/monthly-data.model';
import { UserRole } from '../../../core/models/role.model';
import { RecentRequestsTableComponent } from '../../../components/recent-requests-table/recent-requests-table.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, RecentRequestsTableComponent],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class DashboardComponent {
    recentRequests: RecentRequest[] = [];
    stats: DashboardStats | undefined;
    notifications: Notification[] = [];
    quickActions: QuickAction[] = [];
    actionItems: ActionRequired[] = [];
    monthlyData: MonthlyData | undefined;
    userRole: UserRole | undefined;

    // Chart Data
    chartAreaPath: string = '';
    chartLinePath: string = '';
    chartPoints: { x: number, y: number, value: number, label: string }[] = [];
    yAxisTicks: { value: number, y: number }[] = [];
    readonly UserRole = UserRole; // Expose enum to template

    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.currentUserRole$.subscribe(role => {
            this.userRole = role;
            if (this.userRole === UserRole.Admin || this.userRole === UserRole.User) {
                this.loadMonthlyData();
            }
        });

        this.loadDashboardStats();
        this.loadRecentRequests();
        this.loadNotifications();
        this.loadQuickActions();
        this.loadActionRequired();
    }

    loadDashboardStats() {
        this.dashboardService.getDashboardStats().subscribe({
            next: (res) => {
                if (res.success) {
                    this.stats = res.data;
                }
            },
            error: (err) => console.error('Failed to load stats', err)
        });
    }

    loadRecentRequests() {
        this.dashboardService.getRecentRequests().subscribe({
            next: (res) => {
                if (res.success) {
                    this.recentRequests = res.data;
                }
            },
            error: (err) => console.error('Failed to load requests', err)
        });
    }

    loadNotifications() {
        this.dashboardService.getNotifications().subscribe({
            next: (res) => {
                if (res.success) {
                    this.notifications = res.data;
                }
            },
            error: (err) => console.error('Failed to load notifications', err)
        });
    }

    loadQuickActions() {
        this.dashboardService.getQuickActions().subscribe({
            next: (res) => {
                if (res.success) {
                    this.quickActions = res.data;
                }
            },
            error: (err) => console.error('Failed to load quick actions', err)
        });
    }

    loadActionRequired() {
        this.dashboardService.getActionRequired().subscribe({
            next: (res) => {
                if (res.success) {
                    this.actionItems = res.data;
                }
            },
            error: (err) => console.error('Failed to load action required', err)
        });
    }

    loadMonthlyData() {
        this.dashboardService.getMonthlyData().subscribe({
            next: (res) => {
                if (res.success) {
                    this.monthlyData = res.data;
                    this.generateChart();
                }
            },
            error: (err) => console.error('Failed to load monthly data', err)
        });
    }

    generateChart() {
        if (!this.monthlyData) return;

        const dataKeys = Object.keys(this.monthlyData);
        const dataValues = Object.values(this.monthlyData);

        if (dataKeys.length === 0) return;

        const width = 800; // SVG internal width
        const height = 300; // SVG internal height
        const padding = { top: 20, right: 20, bottom: 30, left: 50 }; // Increased left for Y-axis labels

        const rawMax = Math.max(...dataValues, 50); // Minimum max is 50
        const maxVal = Math.ceil(rawMax / 10) * 10; // Round up to nearest 10

        // Generate Y-Axis Ticks (5 steps: 0, 10, 20, 30, 40, 50...)
        const stepYCount = 5;
        this.yAxisTicks = [];
        for (let i = 0; i <= stepYCount; i++) {
            const val = Math.round((maxVal / stepYCount) * i);
            const yPos = height - padding.bottom - ((val / maxVal) * (height - padding.top - padding.bottom));
            this.yAxisTicks.push({ value: val, y: yPos });
        }

        const stepX = (width - padding.left - padding.right) / (dataKeys.length - 1);

        this.chartPoints = dataValues.map((val, index) => {
            return {
                x: padding.left + (index * stepX),
                y: height - padding.bottom - ((val / maxVal) * (height - padding.top - padding.bottom)),
                value: val,
                label: dataKeys[index].substring(0, 3) // First 3 chars of month
            };
        });

        // Generate Line Path
        let pathD = `M ${this.chartPoints[0].x} ${this.chartPoints[0].y}`;
        for (let i = 1; i < this.chartPoints.length; i++) {
            pathD += ` L ${this.chartPoints[i].x} ${this.chartPoints[i].y}`;
        }
        this.chartLinePath = pathD;

        // Generate Area Path (close to bottom)
        this.chartAreaPath = `${pathD} L ${this.chartPoints[this.chartPoints.length - 1].x} ${height - padding.bottom} L ${this.chartPoints[0].x} ${height - padding.bottom} Z`;
    }
}
