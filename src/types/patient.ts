export interface EmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
}

export type PatientFormStatus = 'idle' | 'filling' | 'submitted';

export interface PatientFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContact?: EmergencyContact;
  religion?: string;
  status: PatientFormStatus;
  lastUpdated?: string;
}
