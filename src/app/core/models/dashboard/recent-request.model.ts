export interface RecentRequest {
    id: string;
    requestId: string;
    governorate: string;
    applicant: string;
    requestType: string;
    createdDate: string;
    lastActionDate: string;
    status: string;
}

export interface RecentRequestsResponse {
    success: boolean;
    data: RecentRequest[];
    message: string;
    errors: string[];
    timestamp: string;
    traceId: string;
}
