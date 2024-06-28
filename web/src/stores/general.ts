import { atomWithStorage } from 'jotai/utils';

export const isConnectedAtom = atomWithStorage<boolean>('isConnected', false);
