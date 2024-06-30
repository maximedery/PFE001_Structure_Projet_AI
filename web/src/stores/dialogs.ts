import { atom } from 'jotai';

import type { ProjectDialogDefaultValues } from '@/components/global/project-dialog';
import type { TaskDialogDefaultValues } from '@/components/global/task-dialog';
import type { WorkspaceDialogDefaultValues } from '@/components/global/workspace-dialog';

// Types

type ClosedState = { isOpen: false };

type CreateDialogState = { isOpen: true };
type UpdateDialogState<T> = { isOpen: true; id: string; defaultValues: T };

type DeleteDialogState = {
  isOpen: true;
  id: string;
  name: string | null;
};

// Atoms

export const projectDialogStateAtom = atom<
  | ClosedState
  | CreateDialogState
  | UpdateDialogState<ProjectDialogDefaultValues>
>({
  isOpen: false,
});

export const deleteProjectDialogStateAtom = atom<
  ClosedState | DeleteDialogState
>({
  isOpen: false,
});

export const taskDialogStateAtom = atom<
  | ClosedState
  | CreateDialogState
  | (UpdateDialogState<TaskDialogDefaultValues> & { projectId: string })
>({
  isOpen: false,
});

export const deleteTaskDialogStateAtom = atom<ClosedState | DeleteDialogState>({
  isOpen: false,
});

export const workspaceDialogStateAtom = atom<
  | ClosedState
  | CreateDialogState
  | UpdateDialogState<WorkspaceDialogDefaultValues>
>({
  isOpen: false,
});

export const deleteWorkspaceDialogStateAtom = atom<
  ClosedState | DeleteDialogState
>({
  isOpen: false,
});
