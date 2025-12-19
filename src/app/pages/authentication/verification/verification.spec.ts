import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verification } from './verification';

describe('Verification', () => {
  let component: Verification;
  let fixture: ComponentFixture<Verification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verification]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Verification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with 4 empty OTP fields', () => {
    expect(component.otp.length).toBe(4);
    expect(component.otp.every(val => val === '')).toBe(true);
  });
});
