import { atomWithStorage } from 'jotai/utils';

export const currentWorkspaceIdAtom = atomWithStorage<string | null>(
  'currentWorkspaceId',
  null,
);

export const isConnectedAtom = atomWithStorage<boolean>('isConnected', false);
