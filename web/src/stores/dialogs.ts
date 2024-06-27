import { atom } from 'jotai';

import type { ProjectDialogDefaultValues } from '@/components/global/project-dialog';
import type { TaskDialogDefaultValues } from '@/components/global/task-dialog';

export const projectDialogStateAtom = atom<
  | {
      // Closed
      isOpen: false;
    }
  | {
      // Open To Create
      isOpen: true;
    }
  | {
      // Open To Update
      isOpen: true;
      id: string;
      defaultValues: ProjectDialogDefaultValues;
    }
>({
  isOpen: false,
});

export const deleteProjectDialogStateAtom = atom<
  | {
      isOpen: false;
    }
  | {
      isOpen: true;
      id: string;
      name: string | null;
    }
>({
  isOpen: false,
});

export const deleteTaskDialogStateAtom = atom<
  | {
      isOpen: false;
    }
  | {
      isOpen: true;
      id: string;
      name: string | null;
    }
>({
  isOpen: false,
});

export const taskDialogStateAtom = atom<
  | {
      // Closed
      isOpen: false;
    }
  | {
      // Open To Create
      isOpen: true;
      projectId: string;
    }
  | {
      // Open To Update
      isOpen: true;
      id: string;
      projectId: string;
      defaultValues: TaskDialogDefaultValues;
    }
>({
  isOpen: false,
});
