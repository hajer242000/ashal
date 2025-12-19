import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Self, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-text-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput {
  @Input() label = '';
  @Input() icon = '';
  @Input() type = 'text';

  @Input() isLabeled: boolean = true;

  @Input() showErrors: boolean = true;
  @Input() isView: boolean = false;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void { }

  registerOnTouched(fn: any): void {
    let value = this.addNumbers(2, 3);
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  addNumbers(x: number, y: number) {
    return x + y;
  }
}
