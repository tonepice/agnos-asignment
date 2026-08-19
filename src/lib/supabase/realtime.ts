import { supabase } from './client';
import { PatientFormData } from '@/types/patient';

export const PATIENT_CHANNEL_NAME = 'patient-form-sync';
export const PATIENT_EVENT_NAME = 'patient_update';

// Fallback browser channel for instant multi-tab real-time sync
const localBroadcast =
  typeof window !== 'undefined' && 'BroadcastChannel' in window
    ? new BroadcastChannel(PATIENT_CHANNEL_NAME)
    : null;

/**
 * Broadcast patient form changes in real-time to Staff View
 */
export function broadcastPatientUpdate(data: Partial<PatientFormData>) {
  // 1. Broadcast via local browser channel
  if (localBroadcast) {
    localBroadcast.postMessage(data);
  }

  // 2. Broadcast via Supabase Realtime WebSocket channel if initialized
  if (supabase) {
    const channel = supabase.channel(PATIENT_CHANNEL_NAME);
    channel
      .send({
        type: 'broadcast',
        event: PATIENT_EVENT_NAME,
        payload: data,
      })
      .catch((err) => {
        console.warn('[Supabase Realtime] Broadcast error:', err);
      });
  }
}

/**
 * Subscribe to real-time patient form updates from Staff View
 */
export function subscribePatientUpdates(onUpdate: (data: PatientFormData) => void): () => void {
  const unsubscribers: Array<() => void> = [];

  // 1. Subscribe to local browser channel
  if (localBroadcast) {
    const handleLocalMessage = (event: MessageEvent) => {
      if (event.data) {
        onUpdate(event.data as PatientFormData);
      }
    };
    localBroadcast.addEventListener('message', handleLocalMessage);
    unsubscribers.push(() => localBroadcast.removeEventListener('message', handleLocalMessage));
  }

  // 2. Subscribe to Supabase Realtime WebSocket channel
  if (supabase) {
    const client = supabase;
    const channel = client.channel(PATIENT_CHANNEL_NAME);

    channel
      .on('broadcast', { event: PATIENT_EVENT_NAME }, (response) => {
        if (response.payload) {
          onUpdate(response.payload as PatientFormData);
        }
      })
      .subscribe((status) => {
        console.log(`[Supabase Realtime] Channel status: ${status}`);
      });

    unsubscribers.push(() => {
      client.removeChannel(channel);
    });
  }

  return () => {
    unsubscribers.forEach((unsub) => unsub());
  };
}
