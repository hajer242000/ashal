import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';

import { AppButton } from '../../../components/button/button';

@Component({
  selector: 'app-verification',
  imports: [CommonModule, AuthenticationLayout, RouterLink, AppButton],
  templateUrl: './verification.html',
  styleUrl: './verification.css',
})
export class Verification implements AfterViewInit {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  otp = ['', '', '', '', '', ''];
  isComplete = false;
  source = 'register'; // Default to register style

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['source']) {
        this.source = params['source'];
      }
    });
  }

  ngAfterViewInit() {
    // Focus the first input initially
    this.focusInput(0);
  }




  trackByFn(index: number): number {
    return index;
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');

    // Update model
    this.otp[index] = value ? value[0] : '';

    // Only update input value if it differs from model (fixes invalid chars and prevents duplication glitch)
    // Note: Angular [value] binding handles the rest, but we need instant feedback for 'a' or '12' cases
    if (input.value !== this.otp[index]) {
      input.value = this.otp[index];
    }

    // Move to next field if we have a valid value
    if (this.otp[index] && index < this.otp.length - 1) {
      this.focusInput(index + 1);
    }

    this.checkComplete();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      if (!this.otp[index] && index > 0) {
        // If current is empty and backspace pressed, move back and clear previous
        this.otp[index - 1] = '';
        this.focusInput(index - 1);
      } else {
        // Clear current
        this.otp[index] = '';
      }

      this.isComplete = false;
    } else if (event.key === 'ArrowLeft') {
      if (index > 0) {
        this.focusInput(index - 1);
      }
    } else if (event.key === 'ArrowRight') {
      if (index < this.otp.length - 1) {
        this.focusInput(index + 1);
      }
    }
  }

  handlePaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    const pastedData = clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (!pastedData) return;

    let currentIndex = index;
    for (let i = 0; i < pastedData.length; i++) {
      if (currentIndex < this.otp.length) {
        this.otp[currentIndex] = pastedData[i];
        currentIndex++;
      }
    }

    this.checkComplete();

    // Focus the next empty field or the last filled one
    if (currentIndex < this.otp.length) {
      this.focusInput(currentIndex);
    } else {
      this.focusInput(this.otp.length - 1);
    }
  }

  handleFocus(index: number) {
    const firstEmptyIndex = this.otp.findIndex(v => v === '');

    if (firstEmptyIndex === -1) return;

    if (index > firstEmptyIndex) {
      this.focusInput(firstEmptyIndex);
    }
  }

  focusInput(index: number) {
    setTimeout(() => {
      const inputsArray = this.inputs.toArray();
      if (inputsArray[index]) {
        inputsArray[index].nativeElement.focus();
      }
    });
  }

  checkComplete() {
    this.isComplete = this.otp.every((v) => v !== '');
  }

  validateOTP() {
    alert('Success: ' + this.otp.join(''));
    if (this.source === 'login') {
      this.router.navigate(['/application/dashboard']);
    } else {
      // For register, maybe go to login or dashboard? keeping as is or nav to login
      this.router.navigate(['/login']);
    }
  }
}
