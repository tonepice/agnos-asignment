'use client';

import { useState } from 'react';
import { PatientFormData } from '@/types/patient';
import { validatePatientForm } from '@/schemas/patient.schema';
import { broadcastPatientUpdate } from '@/lib/supabase/realtime';

const initialFormData: PatientFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  phoneNumber: '',
  email: '',
  address: '',
  preferredLanguage: 'Thai',
  nationality: 'Thai',
  religion: '',
  emergencyContact: { name: '', relationship: '', phone: '' },
  status: 'idle',
};

export function usePatientForm() {
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof PatientFormData>(field: K, value: PatientFormData[K]) => {
    const updated: PatientFormData = {
      ...formData,
      [field]: value,
      status: 'filling',
      lastUpdated: new Date().toISOString(),
    };
    setFormData(updated);
    broadcastPatientUpdate(updated);
  };

  const submitForm = () => {
    const validationErrors = validatePatientForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitted: PatientFormData = {
        ...formData,
        status: 'submitted',
        lastUpdated: new Date().toISOString(),
      };
      setFormData(submitted);
      broadcastPatientUpdate(submitted);
      return true;
    }
    return false;
  };

  return {
    formData,
    errors,
    updateField,
    submitForm,
  };
}
