'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import useSupabaseBrowser from '@/lib/supabase/supabase-client';

export default function LoginPage() {
  const supabase = useSupabaseBrowser();

  return (
    <div className="flex h-full items-center justify-center pb-16">
      <div className="w-[420px] rounded-lg border p-4">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
        />
      </div>
    </div>
  );
}
