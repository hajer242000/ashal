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
            localStorage.setItem('mock_role', 'Admin');
            responseBody = {
                role: 'Admin',
                requiresOtp: true,
                message: 'OTP sent to email'
            };
        } else if (email === 'user@ashal.com') {
            localStorage.setItem('mock_role', 'User');
            responseBody = {
                role: 'User',
                requiresOtp: false,
                message: 'OTP sent to email'
            };
        } else {
            localStorage.setItem('mock_role', 'Applicant');
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

    // Mock Recent Requests
    if (url.endsWith('/Dashboard/recent-requests') && method === 'GET') {
        console.log('Mocking Recent Requests API');
        const mockData = {
            success: true,
            data: [

                {
                    id: "3",
                    requestId: "REQ-2024-003",
                    governorate: "Muscat",
                    applicant: "Mohamed Al-Balushi",
                    requestType: "Construction",
                    createdDate: "2024-06-12T12:53:00",
                    lastActionDate: "2024-07-15T12:53:00",
                    status: "Completed"
                },
                {
                    id: "4",
                    requestId: "REQ-2024-004",
                    governorate: "Sohar",
                    applicant: "Khalid Al-Amrita",
                    requestType: "Maintenance",
                    createdDate: "2024-06-14T09:15:00",
                    lastActionDate: "2024-07-16T10:20:00",
                    status: "In Progress"
                },
                {
                    id: "5",
                    requestId: "REQ-2024-005",
                    governorate: "Salalah",
                    applicant: "Sara Al-Jabri",
                    requestType: "New Connection",
                    createdDate: "2024-06-15T11:45:00",
                    lastActionDate: "2024-07-16T14:30:00",
                    status: "Rejected"
                },
                {
                    id: "6",
                    requestId: "REQ-2024-006",
                    governorate: "Nizwa",
                    applicant: "Omar Al-Kindi",
                    requestType: "Meter Check",
                    createdDate: "2024-06-16T08:00:00",
                    lastActionDate: "2024-07-17T09:00:00",
                    status: "In Progress"
                },
                {
                    id: "1",
                    requestId: "REQ-2024-001",
                    governorate: "Muscat",
                    applicant: "Ahmed Ali",
                    requestType: "Construction",
                    createdDate: "2024-06-12T12:53:00",
                    lastActionDate: "2024-07-15T12:53:00",
                    status: "Completed"
                },
                {
                    id: "1",
                    requestId: "REQ-2024-002",
                    governorate: "Muscat",
                    applicant: "Fatima Al-Said",
                    requestType: "Construction",
                    createdDate: "2024-06-12T12:53:00",
                    lastActionDate: "2024-07-15T12:53:00",
                    status: "Completed"
                },
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
                totalRequests: 5,
                newRequests: 2,
                completedRequests: 2,
                inProgressRequests: 2,
                growthPercentage: 75
            },
            message: "Stats fetched successfully",
            errors: [],
            timestamp: new Date().toISOString(),
            traceId: "trace-stats-123"
        };
        return of(new HttpResponse({ status: 200, body: mockData })).pipe(delay(500));
    }

    // Mock Notifications
    if (url.endsWith('/Dashboard/notifications') && method === 'GET') {
        console.log('Mocking Notifications API');

        const role = localStorage.getItem('mock_role') || 'Applicant';
        console.log('Fetching notifications for role:', role);

        // Mock data for Applicant
        const applicantNotifications = [
            {
                id: '1',
                title: 'System Update',
                description: 'The NOC system will be under maintenance tonight from 12 AM to 4 AM.',
                time: '2 hours ago',
                type: 'info',
                isRead: false
            },
            {
                id: '2',
                title: 'Request #001 Completed',
                description: 'Your request for Muscat Construction has been successfully completed.',
                time: '5 hours ago',
                type: 'success',
                isRead: false
            },
            {
                id: '3',
                title: 'New User Assigned',
                description: 'Ahmed Al-Balushi was assigned to your pending request #776.',
                time: '1 day ago',
                type: 'user', // orange icon
                isRead: true
            }
        ];

        // Mock data for User (Employee)
        const userNotifications = [
            { id: '4', title: 'New Request Created', description: 'A new request #889 has been submitted by a citizen.', time: '10 mins ago', type: 'info', isRead: false },
            { id: '5', title: 'Action Required', description: 'Request #776 is pending your technical approval.', time: '1 hour ago', type: 'warning', isRead: false },
            { id: '6', title: 'Reminder', description: 'Please submit your weekly performance report by EOD.', time: '3 hours ago', type: 'info', isRead: true }
        ];

        // Mock data for Admin
        const adminNotifications = [
            { id: '7', title: 'New User Created', description: 'User Ahmed Al-Balushi has been registered as an Inspector.', time: '30 mins ago', type: 'success', isRead: false },
            { id: '8', title: 'New Delegation', description: 'Delegation assigned to HR department for leave approvals.', time: '4 hours ago', type: 'info', isRead: true },
            { id: '9', title: 'High Server Load', description: 'Server CPU usage exceeded 80% for the last 15 minutes.', time: '6 hours ago', type: 'error', isRead: true }
        ];

        let dataToReturn = applicantNotifications;
        if (role === 'User') {
            dataToReturn = userNotifications;
        } else if (role === 'Admin') {
            dataToReturn = adminNotifications;
        }

        const mockData = {
            success: true,
            data: dataToReturn,
            message: "Notifications fetched successfully",
            errors: [],
            timestamp: new Date().toISOString(),
            traceId: "trace-notif-123"
        };
        return of(new HttpResponse({ status: 200, body: mockData })).pipe(delay(500));
    }

    // Mock Quick Actions
    if (url.endsWith('/Dashboard/quick-actions') && method === 'GET') {
        console.log('Mocking Quick Actions API');
        const role = localStorage.getItem('mock_role') || 'Applicant';

        const applicantActions = [
            { id: '1', label: 'Submit a new Request', icon: 'add_circle_outline', color: 'green-text' },
            { id: '2', label: 'Complete last request', icon: 'cloud_upload', color: 'green-text' },
            { id: '3', label: 'Print last request', icon: 'print', color: 'green-text' }
        ];

        const userActions = [
            { id: '4', label: 'Delegate', icon: 'assignment_ind', color: 'blue-text' },
            { id: '5', label: 'Approve last requests', icon: 'done_all', color: 'blue-text' }
        ];

        const adminActions = [
            { id: '6', label: 'Delegate', icon: 'assignment_ind', color: 'red-text' },
            { id: '7', label: 'Activate Applicant', icon: 'person_add', color: 'red-text' }
        ];

        let dataToReturn = applicantActions;
        if (role === 'User') {
            dataToReturn = userActions;
        } else if (role === 'Admin') {
            dataToReturn = adminActions;
        }

        const mockData = {
            success: true,
            data: dataToReturn,
            message: "Quick actions fetched successfully",
            errors: [],
            timestamp: new Date().toISOString(),
            traceId: "trace-action-123"
        };
        return of(new HttpResponse({ status: 200, body: mockData })).pipe(delay(500));
    }


    // Mock Action Required
    if (url.endsWith('/Dashboard/action-required') && method === 'GET') {
        console.log('Mocking Action Required API');
        const role = localStorage.getItem('mock_role') || 'Applicant';

        const applicantActions = [
            { id: '1', text: 'Complete your last request', type: 'red' },
            { id: '2', text: 'Your request #234 was updated to complete', type: 'red' }
        ];

        const userActions = [
            { id: '3', text: '5 requests in progress need review', type: 'yellow' },
            { id: '4', text: 'Submit weekly report', type: 'blue' }
        ];

        const adminActions = [
            { id: '5', text: 'New user "Ahmed" needs activation', type: 'red' },
            { id: '6', text: 'Database backup failed', type: 'red' },
            { id: '7', text: 'System maintenance scheduled', type: 'blue' }
        ];

        let dataToReturn = applicantActions;
        if (role === 'User') {
            dataToReturn = userActions;
        } else if (role === 'Admin') {
            dataToReturn = adminActions;
        }

        const mockData = {
            success: true,
            data: dataToReturn,
            message: "Action required items fetched successfully",
            errors: [],
            timestamp: new Date().toISOString(),
            traceId: "trace-action-req-123"
        };
        return of(new HttpResponse({ status: 200, body: mockData })).pipe(delay(500));
    }


    // Mock Monthly Data
    if (url.endsWith('/Dashboard/monthly-data') && method === 'GET') {
        console.log('Mocking Monthly Data API');

        const mockData = {
            success: true,
            data: {
                "January": 65,
                "February": 59,
                "March": 80,
                "April": 81,
                "May": 56,
                "June": 55,
                "July": 40
            },
            message: "Monthly data fetched successfully",
            errors: [],
            timestamp: new Date().toISOString(),
            traceId: "trace-monthly-123"
        };
        return of(new HttpResponse({ status: 200, body: mockData })).pipe(delay(500));
    }

    return next(req);
};
