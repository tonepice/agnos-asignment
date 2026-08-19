'use client';

import { useEffect, useState } from 'react';
import { PatientFormData } from '@/types/patient';
import { subscribePatientUpdates } from '@/lib/supabase/realtime';

export function usePatientRealtime(initialData?: PatientFormData) {
  const [patientData, setPatientData] = useState<PatientFormData | null>(initialData || null);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribePatientUpdates((data) => {
      setPatientData(data);
    });

    return () => {
      setIsConnected(false);
      unsubscribe();
    };
  }, []);

  return {
    patientData,
    isConnected,
  };
}
