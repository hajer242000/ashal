import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar';

import { AppbarComponent } from '../../components/appbar/appbar';

@Component({
  selector: 'app-applicant',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, AppbarComponent],
  template: `
    <div class="flex h-screen">
      <app-sidebar></app-sidebar>
      <div class="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        <app-appbar></app-appbar>
        <div class="flex-1 overflow-auto p-6">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class ApplicantComponent { }
