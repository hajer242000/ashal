import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterRequest } from '../models/authentication/register-request.model';
import { LoginRequest } from '../models/authentication/login-request.model';
import { UserRole } from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private currentUserRoleSubject = new BehaviorSubject<UserRole>(UserRole.Applicant); // Default to Applicant
    public currentUserRole$ = this.currentUserRoleSubject.asObservable();

    constructor(private http: HttpClient) { }

    setRole(role: UserRole) {
        this.currentUserRoleSubject.next(role);
    }

    getRole(): UserRole {
        return this.currentUserRoleSubject.value;
    }

    register(data: RegisterRequest): Observable<any> {
        const formData = new FormData();

        // Append all required fields
        formData.append('Username', data.Username);
        formData.append('Email', data.Email);
        formData.append('number', data.number.toString()); // API expects integer($int32) but formData sends strings mostly, backend usually parses. Let's send as string or check if we need to be careful. FormData values are strings or Blobs.
        formData.append('Password', data.Password);
        formData.append('FullName', data.FullName);
        formData.append('PhoneNumber', data.PhoneNumber);
        formData.append('ApplicantType', data.ApplicantType.toString());

        if (data.VerificationFile) {
            formData.append('VerificationFile', data.VerificationFile);
        }

        return this.http.post(`${this.apiUrl}/Auth/register`, formData);
    }

    login(data: LoginRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/Auth/login`, data);
    }
}
