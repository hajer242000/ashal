export interface MonthlyData {
    [key: string]: number;
}

export interface MonthlyDataResponse {
    success: boolean;
    data: MonthlyData;
    message: string;
    errors: string[];
    timestamp: string;
    traceId: string;
}
