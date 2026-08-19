import { PatientFormData } from '@/types/patient';

export function validatePatientForm(data: Partial<PatientFormData>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'กรุณาระบุชื่อจริง (First Name)';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'กรุณาระบุนามสกุล (Last Name)';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'กรุณาระบุวันเกิด (Date of Birth)';
  }

  if (!data.gender) {
    errors.gender = 'กรุณาเลือกเพศ (Gender)';
  }

  if (!data.phoneNumber?.trim()) {
    errors.phoneNumber = 'กรุณาระบุเบอร์โทรศัพท์';
  } else if (!/^[0-9+\s-]{8,15}$/.test(data.phoneNumber.trim())) {
    errors.phoneNumber = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง';
  }

  if (!data.email?.trim()) {
    errors.email = 'กรุณาระบุอีเมล';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'รูปแบบอีเมลไม่ถูกต้อง (Invalid email)';
  }

  if (!data.address?.trim()) {
    errors.address = 'กรุณาระบุที่อยู่';
  }

  if (!data.preferredLanguage?.trim()) {
    errors.preferredLanguage = 'กรุณาระบุภาษาหลักที่สะดวก';
  }

  if (!data.nationality?.trim()) {
    errors.nationality = 'กรุณาระบุสัญชาติ';
  }

  return errors;
}
