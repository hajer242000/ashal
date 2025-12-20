export interface QuickAction {
    id: string;
    label: string;
    icon: string;
    color: string; // e.g., 'green-text', 'blue-text'
    action?: string; // Potential router link or method name
}

export interface QuickActionResponse {
    success: boolean;
    data: QuickAction[];
    message: string;
    errors: string[];
    timestamp: string;
    traceId: string;
}
