import { atom } from 'jotai';

import { ProjectDialogDefaultValues } from '@/components/global/project-dialog';

export const projectDialogStateAtom = atom<{
  isOpen: boolean;
  defaultValues?: ProjectDialogDefaultValues;
}>({
  isOpen: false,
  defaultValues: undefined,
});

export const deleteProjectDialogStateAtom = atom<{
  isOpen: boolean;
  id?: string;
  name?: string;
}>({
  isOpen: false,
});

export const taskDialogStateAtom = atom<{
  isOpen: boolean;
  defaultValues?: ProjectDialogDefaultValues;
}>({
  isOpen: false,
  defaultValues: undefined,
});
