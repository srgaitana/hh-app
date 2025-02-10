// src/lib/types.ts

export interface User {
    UserID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PasswordHash: string;
    PhoneNumber?: string;
    DateOfBirth?: Date;
    Gender: 'male' | 'female' | 'other';
    GenderIdentity?: string;
    Role: 'Patient' | 'Healthcare Professional' | 'Admin';
    UserStatus: 'Active' | 'Inactive';
    LastLoginAt?: Date;
    CreatedAtUser: Date;
    UpdatedAtUser: Date;
}

export interface Specialty {
    SpecialtyID: number;
    SpecialtyName: string;
    Description?: string;
}

export interface HealthcareProfessional {
    ProfessionalID: number;
    UserID: number;
    SpecialtyID: number;
    Experience?: number;
    LicenseNumber?: string;
    Education?: string;
    ConsultationFee?: number;
    ProfessionalStatus: 'Available' | 'Unavailable';
    CreatedAtProfessional: Date;
    UpdatedAtProfessional: Date;
}

export interface ProfessionalAvailability {
    AvailabilityID: number;
    ProfessionalID: number;
    AvailabilityDate: Date;
    StartTime: string;
    EndTime: string;
    AvailabilityStatus: 'Available' | 'Unavailable';
    CreatedAtAvailability: Date;
    UpdatedAtAvailability: Date;
}

export interface Appointment {
    AppointmentID: number;
    UserID: number;
    ProfessionalID: number;
    AppointmentDate: Date;
    AppointmentStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No Show';
    Type: 'First Visit' | 'Follow-up' | 'Therapy';
    Reason: string;
    Notes?: string;
    ConsultationFee?: number;
    CreatedAtAppointment: Date;
    UpdatedAtAppointment: Date;
}

export interface PasswordReset {
    ResetID: number;
    UserID: number;
    Token: string;
    CreatedAtPasswordReset: Date;
    ExpiresAt: Date;
}

export interface TherapySession {
    TherapySessionID: number;
    AppointmentID: number;
    SessionNumber: number;
    Duration: number;
}

export interface Cancellation {
    CancellationID: number;
    AppointmentID: number;
    CanceledBy: 'User' | 'Professional';
    Reason?: string;
    CreatedAtCancellation: Date;
}

export interface Review {
    ReviewID: number;
    UserID: number;
    ProfessionalID: number;
    AppointmentID: number;
    Rating: number;
    Comment?: string;
    IsVerified: boolean;
    CreatedAtReview: Date;
    UpdatedAtReview: Date;
}

export interface Billing {
    BillingID: number;
    AppointmentID: number;
    ProfessionalID: number;
    UserID: number;
    Amount: number;
    PaymentMethod: 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'Other';
    PaymentDate: Date;
    BillingStatus: 'Pending' | 'Completed' | 'Failed';
    CreatedAtBilling: Date;
    UpdatedAtBilling: Date;
}