import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecentRequestsResponse } from '../models/dashboard/recent-request.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getRecentRequests(): Observable<RecentRequestsResponse> {
        return this.http.get<RecentRequestsResponse>(`${this.apiUrl}/Dashboard/recent-requests`);
    }
}
