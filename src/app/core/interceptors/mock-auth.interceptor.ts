import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export const mockAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const { url, method, body } = req;

    // Mock Register
    if (url.endsWith('/Auth/register') && method === 'POST') {
        console.log('Mocking Register API', body);
        return of(new HttpResponse({ status: 200, body: { message: 'Registration successful' } })).pipe(delay(1000));
    }

    // Mock Login
    if (url.endsWith('/Auth/login') && method === 'POST') {
        console.log('Mocking Login API', body);
        const { email } = body as any;

        let responseBody;

        // Simulate user types
        if (email === 'admin@ashal.com') {
            responseBody = {
                role: 'Admin',
                requiresOtp: true,
                message: 'OTP sent to email'
            };
        } else if (email === 'user@ashal.com') {
            responseBody = {
                role: 'User',
                requiresOtp: true,
                message: 'OTP sent to email'
            };
        } else {
            // Default / Applicant
            responseBody = {
                role: 'Applicant',
                requiresOtp: false,
                token: 'mock-jwt-token-applicant',
                message: 'Login successful'
            };
        }

        return of(new HttpResponse({ status: 200, body: responseBody })).pipe(delay(1000));
    }

    // Pass through other requests
    if (url.endsWith('/Dashboard/recent-requests') && method === 'GET') {
        console.log('Mocking Recent Requests API');
        const mockData = {
            success: true,
            data: [
                {
                    id: "1",
                    requestId: "REQ-2023-001",
                    governorate: "Muscat",
                    applicant: "Ahmed Ali Al-Harthy",
                    requestType: "New Connection",
                    createdDate: "2023-10-01",
                    lastActionDate: "2023-10-02",
                    status: "Pending"
                },
                {
                    id: "2",
                    requestId: "REQ-2023-005",
                    governorate: "Salalah",
                    applicant: "Fatima Al-Said",
                    requestType: "Maintenance",
                    createdDate: "2023-09-28",
                    lastActionDate: "2023-09-30",
                    status: "Approved"
                },
                {
                    id: "3",
                    requestId: "REQ-2023-008",
                    governorate: "Sohar",
                    applicant: "Mohamed Al-Balushi",
                    requestType: "Disconnection",
                    createdDate: "2023-10-05",
                    lastActionDate: "2023-10-06",
                    status: "Rejected"
                },
                {
                    id: "4",
                    requestId: "REQ-2023-012",
                    governorate: "Nizwa",
                    applicant: "Sara Al-Kindi",
                    requestType: "Meter Replacement",
                    createdDate: "2023-10-10",
                    lastActionDate: "2023-10-11",
                    status: "In Progress"
                },
                {
                    id: "5",
                    requestId: "REQ-2023-015",
                    governorate: "Sur",
                    applicant: "Khalid Al-Araimi",
                    requestType: "Complaint",
                    createdDate: "2023-10-12",
                    lastActionDate: "2023-10-13",
                    status: "Pending"
                }
            ],
            message: "Data fetched successfully",
            errors: [],
            timestamp: new Date().toISOString(),
            traceId: "trace-123"
        };
        return of(new HttpResponse({ status: 200, body: mockData })).pipe(delay(500));
    }

    // Mock Dashboard Stats
    if (url.endsWith('/Dashboard/stats') && method === 'GET') {
        console.log('Mocking Dashboard Stats API');
        const mockData = {
            success: true,
            data: {
                totalRequests: 1250,
                newRequests: 45,
                completedRequests: 890,
                inProgressRequests: 315,
                growthPercentage: 12.5
            },
            message: "Stats fetched successfully",
            errors: [],
            timestamp: new Date().toISOString(),
            traceId: "trace-stats-123"
        };
        return of(new HttpResponse({ status: 200, body: mockData })).pipe(delay(500));
    }

    return next(req);
};
