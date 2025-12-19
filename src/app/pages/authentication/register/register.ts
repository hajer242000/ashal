import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CompanyForm } from './components/company-form/company-form';
import { PersonalForm } from './components/personal-form/personal-form';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';

import { Router, RouterLink } from '@angular/router';

import { AppButton } from '../../../components/button/button';

@Component({
  selector: 'app-register',

  imports: [CommonModule, CompanyForm, PersonalForm, AuthenticationLayout, RouterLink, AppButton],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
  @ViewChild(CompanyForm) companyForm!: CompanyForm;
  @ViewChild(PersonalForm) personalForm!: PersonalForm;

  activeTab: 'company' | 'personal' = 'company';

  constructor(private router: Router) { }

  setTab(tab: 'company' | 'personal') {
    this.activeTab = tab;
  }

  get isFormValid(): boolean {
    if (this.activeTab === 'company') {
      return this.companyForm?.form.valid ?? false;
    } else {
      return this.personalForm?.form.valid ?? false;
    }
  }

  onVerify() {
    if (this.isFormValid) {
      this.router.navigate(['/verify']);
    } else {
      this.formRef?.markAllAsTouched();
    }
  }

  get formRef() {
    return this.activeTab === 'company' ? this.companyForm?.form : this.personalForm?.form;
  }
}
