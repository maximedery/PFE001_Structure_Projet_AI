import { atom } from 'jotai';

import { ProjectDialogDefaultValues } from '@/components/global/project-dialog';

export const projectDialogStateAtom = atom<{
  isOpen: boolean;
  defaultValues?: ProjectDialogDefaultValues;
}>({
  isOpen: false,
  defaultValues: undefined,
});
