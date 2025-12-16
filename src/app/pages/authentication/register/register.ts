import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompanyForm } from './components/company-form/company-form';
import { PersonalForm } from './components/personal-form/personal-form';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';

@Component({
  selector: 'app-register',

  imports: [CommonModule, CompanyForm, PersonalForm , AuthenticationLayout],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
  activeTab: 'company' | 'personal' = 'company';

  setTab(tab: 'company' | 'personal') {
    this.activeTab = tab;
  }
}
