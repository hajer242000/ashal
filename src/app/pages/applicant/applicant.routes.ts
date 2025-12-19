import { Routes } from '@angular/router';
import { ApplicationLayout } from '../../layout/application-layout/application-layout';
import { DashboardComponent } from './dashboard/dashboard';
import { MyRequestComponent } from './my-request/my-request';
import { NewRequestComponent } from './new-request/new-request';
import { NotificationComponent } from './notification/notification';
import { SupportComponent } from './support/support';
import { SettingComponent } from './setting/setting';

export const APPLICANT_ROUTES: Routes = [
    {
        path: '',
        component: ApplicationLayout,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'my-request', component: MyRequestComponent },
            { path: 'new-request', component: NewRequestComponent },
            { path: 'notification', component: NotificationComponent },
            { path: 'support', component: SupportComponent },
            { path: 'setting', component: SettingComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
];
