import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../../../../components/text-input/text-input';
import { FileUploader } from '../../../../../components/file-uploader/file-uploader';

import { PasswordValidator } from '../../../../../shared/validators/password.validator';
import { MatchPasswordValidator } from '../../../../../shared/validators/match-password.validator';

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInput, FileUploader],
  templateUrl: './personal-form.html',
  styleUrl: './personal-form.css',
})
export class PersonalForm {
  form = new FormGroup({
    identityNumber: new FormControl('', [Validators.required]),
    identityNumberFile: new FormControl(null, [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
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
