import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CompanyForm } from './components/company-form/company-form';
import { PersonalForm } from './components/personal-form/personal-form';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';

import { Router, RouterLink } from '@angular/router';

import { AppButton } from '../../../components/button/button';
import { AuthService } from '../../../core/services/auth.service';

import { RegisterRequest } from '../../../core/models/authentication/register-request.model';

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

  constructor(private router: Router, private authService: AuthService) { }

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
      const formValue: any = this.formRef?.value;
      const ApplicantType = this.activeTab === 'company' ? 1 : 0;

      const payload: RegisterRequest = {
        Username: formValue.username,
        Email: formValue.email,
        number: this.activeTab === 'company' ? +formValue.commercialRegistration : +formValue.identityNumber,
        Password: formValue.password,
        FullName: this.activeTab === 'company' ? formValue.companyName : formValue.fullName,
        PhoneNumber: formValue.gsm,
        ApplicantType: ApplicantType,
        VerificationFile: this.activeTab === 'company' ? formValue.commercialRegistrationFile : formValue.identityNumberFile
      };

      this.authService.register(payload).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.router.navigate(['/verify'], { queryParams: { source: 'register' } });
        },
        error: (err) => {
          console.error('Registration failed', err);
          // Handle error appropriately (e.g., show a message)
        }
      });

    } else {
      this.formRef?.markAllAsTouched();
    }
  }

  get formRef() {
    return this.activeTab === 'company' ? this.companyForm?.form : this.personalForm?.form;
  }
}
