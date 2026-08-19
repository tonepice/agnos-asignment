'use client';

import React from 'react';
import { usePatientRealtime } from '@/hooks/usePatientRealtime';
import { useLanguage } from '@/i18n/context';

export function PatientPreview() {
  const { patientData, isConnected } = usePatientRealtime();
  const { t } = useLanguage();

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'filling':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
            {t.staffView.statusFilling}
          </span>
        );
      case 'submitted':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {t.staffView.statusSubmitted}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200">
            {t.staffView.statusIdle}
          </span>
        );
    }
  };

  return (
    <div className="p-5 md:p-8 bg-white/95 backdrop-blur-md border border-zinc-100 rounded-2xl space-y-6 max-w-2xl mx-auto shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-100 pb-4 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">{t.staffView.title}</h2>
          <p className="text-xs text-zinc-500 mt-0.5">{t.staffView.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'
            }`}
          />
          {getStatusBadge(patientData?.status)}
        </div>
      </div>

      {!patientData ? (
        <div className="py-12 text-center text-zinc-500 text-sm font-medium">
          {t.staffView.noData}
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-primary_blue uppercase tracking-wider">
            {t.staffView.patientInfo}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-zinc-50/80 p-4 rounded-xl border border-zinc-100">
            <div>
              <span className="text-xs text-zinc-400 block font-medium">{t.staffView.fullName}</span>
              <span className="font-semibold text-zinc-900">
                {patientData.firstName || '-'} {patientData.middleName} {patientData.lastName}
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block font-medium">{t.staffView.dobGender}</span>
              <span className="font-semibold text-zinc-900">
                {patientData.dateOfBirth || '-'} ({patientData.gender || '-'})
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block font-medium">{t.staffView.phone}</span>
              <span className="font-semibold text-zinc-900">{patientData.phoneNumber || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block font-medium">{t.staffView.email}</span>
              <span className="font-semibold text-zinc-900">{patientData.email || '-'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-xs text-zinc-400 block font-medium">{t.staffView.address}</span>
              <span className="font-semibold text-zinc-900">{patientData.address || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block font-medium">{t.staffView.prefLang}</span>
              <span className="font-semibold text-zinc-900">{patientData.preferredLanguage || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block font-medium">{t.staffView.nationality}</span>
              <span className="font-semibold text-zinc-900">{patientData.nationality || '-'}</span>
            </div>
            {patientData.emergencyContact?.name && (
              <div className="col-span-2 border-t border-zinc-200/60 pt-2 mt-1">
                <span className="text-xs text-zinc-400 block font-medium">{t.staffView.emergency}</span>
                <span className="font-semibold text-zinc-900">
                  {patientData.emergencyContact.name} ({patientData.emergencyContact.relationship}) - {patientData.emergencyContact.phone}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
