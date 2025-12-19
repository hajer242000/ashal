import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../../../../components/text-input/text-input';
import { FileUploader } from '../../../../../components/file-uploader/file-uploader';

import { PasswordValidator } from '../../../../../shared/validators/password.validator';
import { MatchPasswordValidator } from '../../../../../shared/validators/match-password.validator';

@Component({
  selector: 'app-company-form',
  imports: [CommonModule, ReactiveFormsModule, TextInput, FileUploader],
  templateUrl: './company-form.html',
  styleUrl: './company-form.css',
})
export class CompanyForm {
  form = new FormGroup({
    commercialRegistration: new FormControl('', [Validators.required]),
    commercialRegistrationFile: new FormControl(null, [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gsm: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, PasswordValidator.strong]),
    confirmPassword: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  },
    {
      validators: MatchPasswordValidator.match('password', 'confirmPassword'),
    });
}
