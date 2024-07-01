'use client';

import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';

import { supabaseSessionAtom } from '@/stores/general';

import useSupabaseBrowser from './supabase-client';

export const SupabaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = useSupabaseBrowser();
  const setSupabaseSession = useSetAtom(supabaseSessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSupabaseSession, supabase.auth]);

  return children;
};
