import { describe, it, expect } from 'vitest';
import { PATIENT_CHANNEL_NAME, PATIENT_EVENT_NAME } from '../lib/supabase/realtime';
import { SUPABASE_URL, SUPABASE_KEY } from '../lib/supabase/client';

describe('Supabase Realtime Configuration & Constants', () => {
  it('should define correct Supabase Realtime Channel & Event names', () => {
    expect(PATIENT_CHANNEL_NAME).toBe('patient-form-sync');
    expect(PATIENT_EVENT_NAME).toBe('patient_update');
  });

  it('should export SUPABASE_URL and SUPABASE_KEY as strings', () => {
    expect(typeof SUPABASE_URL).toBe('string');
    expect(typeof SUPABASE_KEY).toBe('string');
  });
});
