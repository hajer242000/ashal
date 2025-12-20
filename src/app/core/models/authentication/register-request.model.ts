export interface RegisterRequest {
    Username: string;
    Email: string;
    number: number;
    Password: string;
    FullName: string;
    PhoneNumber: string;
    ApplicantType: number;
    VerificationFile: File;
}
