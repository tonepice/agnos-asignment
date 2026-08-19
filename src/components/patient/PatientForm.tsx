'use client';

import React from 'react';
import { usePatientForm } from '@/hooks/usePatientForm';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/context';

export function PatientForm() {
  const { formData, errors, updateField, submitForm } = usePatientForm();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitForm()) {
      alert(t.patientForm.submittedAlert);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 md:p-8 bg-white/95 backdrop-blur-md border border-zinc-100 rounded-2xl space-y-6 max-w-2xl mx-auto shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">{t.patientForm.title}</h2>
        <p className="text-xs text-zinc-500 mt-1">{t.patientForm.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label={t.patientForm.firstName}
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          error={errors.firstName}
        />
        <Input
          label={t.patientForm.middleName}
          value={formData.middleName || ''}
          onChange={(e) => updateField('middleName', e.target.value)}
        />
        <Input
          label={t.patientForm.lastName}
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          error={errors.lastName}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t.patientForm.dob}
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => updateField('dateOfBirth', e.target.value)}
          error={errors.dateOfBirth}
        />
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-zinc-700">
            {t.patientForm.gender.includes('*') ? (
              <>
                {t.patientForm.gender.replace('*', '')}
                <span className="text-red-500 font-bold ml-0.5">*</span>
              </>
            ) : (
              t.patientForm.gender
            )}
          </label>
          <select
            value={formData.gender}
            onChange={(e) => updateField('gender', e.target.value as "" | "male" | "female" | "other")}
            className="w-full px-3.5 py-2.5 border rounded-lg text-sm bg-white border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary_blue shadow-2xs"
          >
            <option value="">{t.patientForm.selectGender}</option>
            <option value="male">{t.patientForm.male}</option>
            <option value="female">{t.patientForm.female}</option>
            <option value="other">{t.patientForm.other}</option>
          </select>
          {errors.gender && <p className="text-xs text-red-500 mt-1 font-medium">{errors.gender}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t.patientForm.phone}
          value={formData.phoneNumber}
          onChange={(e) => updateField('phoneNumber', e.target.value)}
          error={errors.phoneNumber}
        />
        <Input
          label={t.patientForm.email}
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          error={errors.email}
        />
      </div>

      <Input
        label={t.patientForm.address}
        value={formData.address}
        onChange={(e) => updateField('address', e.target.value)}
        error={errors.address}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t.patientForm.language}
          value={formData.preferredLanguage}
          onChange={(e) => updateField('preferredLanguage', e.target.value)}
          error={errors.preferredLanguage}
        />
        <Input
          label={t.patientForm.nationality}
          value={formData.nationality}
          onChange={(e) => updateField('nationality', e.target.value)}
          error={errors.nationality}
        />
      </div>

      <div className="border-t border-zinc-100 pt-4 space-y-3">
        <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
          {t.patientForm.emergencyContact}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label={t.patientForm.emergencyName}
            value={formData.emergencyContact?.name || ''}
            onChange={(e) =>
              updateField('emergencyContact', { ...formData.emergencyContact, name: e.target.value })
            }
          />
          <Input
            label={t.patientForm.emergencyRelation}
            value={formData.emergencyContact?.relationship || ''}
            onChange={(e) =>
              updateField('emergencyContact', { ...formData.emergencyContact, relationship: e.target.value })
            }
          />
          <Input
            label={t.patientForm.emergencyPhone}
            value={formData.emergencyContact?.phone || ''}
            onChange={(e) =>
              updateField('emergencyContact', { ...formData.emergencyContact, phone: e.target.value })
            }
          />
        </div>
      </div>

      <Input
        label={t.patientForm.religion}
        value={formData.religion || ''}
        onChange={(e) => updateField('religion', e.target.value)}
      />

      <Button type="submit" className="w-full mt-4">
        {t.patientForm.submit}
      </Button>
    </form>
  );
}
