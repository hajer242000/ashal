import { UserRole } from '../models/role.model';

export const SIDEBAR_CONFIG = {
    [UserRole.Applicant]: [
        { title: 'Dashboard', icon: 'dashboard', route: '/application/dashboard' },
        { title: 'My Request', icon: 'folder_shared', route: '/application/my-request' },
        { title: 'New Request', icon: 'add_circle', route: '/application/new-request' },
        { title: 'Notification', icon: 'notifications', route: '/application/notification' },
        { title: 'Support', icon: 'help', route: '/application/support' },
        { title: 'Setting', icon: 'settings', route: '/application/setting' },
    ],
    [UserRole.User]: [
        { title: 'Dashboard', icon: 'dashboard', route: '/application/dashboard' },
        { title: 'Requests', icon: 'folder_shared', route: '/application/my-request' }, // Sharing existing page
        { title: 'Report', icon: 'assessment', route: '/application/report' },
        { title: 'Setting', icon: 'settings', route: '/application/setting' }, // Sharing existing page
    ],
    [UserRole.Admin]: [
        { title: 'Dashboard', icon: 'dashboard', route: '/application/dashboard' },
        { title: 'Requests', icon: 'folder_shared', route: '/application/my-request' }, // Sharing existing page
        { title: 'Users', icon: 'people', route: '/application/users' },
        { title: 'Report', icon: 'assessment', route: '/application/report' },
        { title: 'Workflow', icon: 'schema', route: '/application/workflow' },
        { title: 'Setting', icon: 'settings', route: '/application/setting' }, // Sharing existing page
    ]
};
