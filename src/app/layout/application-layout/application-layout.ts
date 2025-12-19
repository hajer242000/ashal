import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { AppbarComponent } from '../../components/appbar/appbar';

@Component({
    selector: 'app-application-layout',
    standalone: true,
    imports: [RouterModule, SidebarComponent, AppbarComponent],
    templateUrl: './application-layout.html',
    styleUrl: './application-layout.css'
})
export class ApplicationLayout { }
