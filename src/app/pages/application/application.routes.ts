import { Routes } from '@angular/router';
import { ApplicationLayout } from '../../layout/application-layout/application-layout';
import { DashboardComponent } from './dashboard/dashboard';
import { MyRequestComponent } from './my-request/my-request';
import { NewRequestComponent } from './new-request/new-request';
import { NotificationComponent } from './notification/notification';
import { SupportComponent } from './support/support';
import { SettingComponent } from './setting/setting';
import { ReportComponent } from './report/report';
import { UsersComponent } from './users/users';
import { WorkflowComponent } from './workflow/workflow';
import { DelegationComponent } from './delegation/delegation.component';
import { RequestDetailsComponent } from './request-details/request-details';

export const APPLICATION_ROUTES: Routes = [
    {
        path: '',
        component: ApplicationLayout,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'my-request', component: MyRequestComponent },
            { path: 'new-request', component: NewRequestComponent },
            { path: 'notification', loadComponent: () => import('./notifications/notifications').then(m => m.NotificationsComponent) },
            { path: 'support', component: SupportComponent },
            { path: 'setting', component: SettingComponent },
            { path: 'report', component: ReportComponent },
            { path: 'users', component: UsersComponent },
            { path: 'workflow', component: WorkflowComponent },
            { path: 'delegation', component: DelegationComponent },
            { path: 'request/:id', component: RequestDetailsComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
];
