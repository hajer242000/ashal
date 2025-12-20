export interface ActionRequired {
    id: string;
    text: string;
    type: 'red' | 'blue' | 'yellow'; // Type to determine dot color
    link?: string; // Optional link to redirect
}

export interface ActionRequiredResponse {
    success: boolean;
    data: ActionRequired[];
    message: string;
    errors: string[];
    timestamp: string;
    traceId: string;
}
