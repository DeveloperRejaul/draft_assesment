import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import { Storage } from '../storage/storage';

export const supabase = createClient(
  'https://mduwiqsgbrznoglrfztp.supabase.co',
  'sb_publishable_MFvv6Ry0gHVdOFX41OxFMQ_A8EqBWZk',
  {
    auth: {
      storage: Storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);