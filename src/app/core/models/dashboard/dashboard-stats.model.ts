export interface DashboardStats {
    totalRequests: number;
    newRequests: number;
    completedRequests: number;
    inProgressRequests: number;
    growthPercentage: number;
}

export interface DashboardStatsResponse {
    success: boolean;
    data: DashboardStats;
    message: string;
    errors: string[];
    timestamp: string;
    traceId: string;
}
