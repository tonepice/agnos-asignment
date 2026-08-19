import { describe, it, expect } from 'vitest';
import { validatePatientForm } from '../schemas/patient.schema';
import { PatientFormData } from '../types/patient';

describe('Patient Form Schema Validation Unit Tests', () => {
  const validPatientData: PatientFormData = {
    firstName: 'Nattaporn',
    middleName: 'Ton',
    lastName: 'Ongmali',
    dateOfBirth: '1995-08-19',
    gender: 'male',
    phoneNumber: '0970479807',
    email: 'tonepice@gmail.com',
    address: '123 Agnos Health St, Bangkok',
    preferredLanguage: 'Thai',
    nationality: 'Thai',
    religion: 'Buddhism',
    emergencyContact: {
      name: 'Somchai',
      relationship: 'Father',
      phone: '0812345678',
    },
    status: 'filling',
  };

  it('should return no errors for valid patient data', () => {
    const errors = validatePatientForm(validPatientData);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('should return errors when required fields are missing', () => {
    const emptyData: Partial<PatientFormData> = {};
    const errors = validatePatientForm(emptyData);

    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
    expect(errors.dateOfBirth).toBeDefined();
    expect(errors.gender).toBeDefined();
    expect(errors.phoneNumber).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.address).toBeDefined();
    expect(errors.preferredLanguage).toBeDefined();
    expect(errors.nationality).toBeDefined();
  });

  it('should return error for invalid email and phone number format', () => {
    const invalidData: Partial<PatientFormData> = {
      ...validPatientData,
      email: 'not-an-email',
      phoneNumber: 'abc',
    };
    const errors = validatePatientForm(invalidData);
    expect(errors.email).toBe('รูปแบบอีเมลไม่ถูกต้อง (Invalid email)');
    expect(errors.phoneNumber).toBe('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง');
  });

  it('should pass validation when optional fields are omitted', () => {
    const minimalData: Partial<PatientFormData> = {
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '2000-01-01',
      gender: 'female',
      phoneNumber: '0899999999',
      email: 'jane@example.com',
      address: 'Bangkok',
      preferredLanguage: 'Thai',
      nationality: 'Thai',
    };
    const errors = validatePatientForm(minimalData);
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
