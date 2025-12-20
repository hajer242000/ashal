export interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'user';
    isRead: boolean;
}

export interface NotificationResponse {
    success: boolean;
    data: Notification[];
    message: string;
    errors: string[];
    timestamp: string;
    traceId: string;
}
