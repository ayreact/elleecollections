import { createClient } from '@/utils/supabase/client';

export async function trackEvent(eventName: string, payload: any = {}) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from('analytics_events').insert([
      {
        event_name: eventName,
        payload: payload,
      },
    ]);

    if (error) {
      console.error('Analytics tracking failed:', error);
    }
  } catch (err) {
    console.error('Error tracking event:', err);
  }
}
