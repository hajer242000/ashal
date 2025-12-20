import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecentRequestsResponse } from '../models/dashboard/recent-request.model';
import { DashboardStatsResponse } from '../models/dashboard/dashboard-stats.model';
import { NotificationResponse } from '../models/dashboard/notification.model';
import { QuickActionResponse } from '../models/dashboard/quick-action.model';
import { ActionRequiredResponse } from '../models/dashboard/action-required.model';
import { MonthlyDataResponse } from '../models/dashboard/monthly-data.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getRecentRequests(): Observable<RecentRequestsResponse> {
        return this.http.get<RecentRequestsResponse>(`${this.apiUrl}/Dashboard/recent-requests`);
    }

    getDashboardStats(): Observable<DashboardStatsResponse> {
        return this.http.get<DashboardStatsResponse>(`${this.apiUrl}/Dashboard/stats`);
    }

    getNotifications(): Observable<NotificationResponse> {
        return this.http.get<NotificationResponse>(`${this.apiUrl}/Dashboard/notifications`);
    }

    getQuickActions(): Observable<QuickActionResponse> {
        return this.http.get<QuickActionResponse>(`${this.apiUrl}/Dashboard/quick-actions`);
    }

    getActionRequired(): Observable<ActionRequiredResponse> {
        return this.http.get<ActionRequiredResponse>(`${this.apiUrl}/Dashboard/action-required`);
    }

    getMonthlyData(): Observable<MonthlyDataResponse> {
        return this.http.get<MonthlyDataResponse>(`${this.apiUrl}/Dashboard/monthly-data`);
    }
}
