import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const supabaseSessionAtom = atom<Session | undefined | null>(undefined);

export const isAuthenticatedAtom = atom((get) => {
  const session = get(supabaseSessionAtom);

  return {
    isLoading: session === undefined,
    value: !!session,
  };
});
