'use client';

import { useAtom } from 'jotai';

import { useDeleteProject } from '@/services/delete-project';
import { deleteProjectDialogStateAtom } from '@/stores/dialogs';

import { DeleteDialog } from './delete-dialog';

export default function DeleteProjectDialog() {
  const [deleteProjectDialogState, setDeleteProjectDialogState] = useAtom(
    deleteProjectDialogStateAtom,
  );
  const deleteProject = useDeleteProject();

  if (!deleteProjectDialogState.isOpen) {
    return null;
  }

  function handleDelete() {
    if (!deleteProjectDialogState.isOpen) {
      return;
    }

    const projectId = deleteProjectDialogState.id;

    if (!projectId) {
      throw new Error('No project id provided');
    }

    deleteProject.mutate({ id: projectId });
    setDeleteProjectDialogState({ isOpen: false });
  }

  return (
    <DeleteDialog
      isOpen={deleteProjectDialogState.isOpen}
      onOpenChange={(newIsOpen) => {
        if (newIsOpen === false) {
          setDeleteProjectDialogState({ isOpen: false });
        }
      }}
      itemName={deleteProjectDialogState.name}
      onDelete={handleDelete}
    />
  );
}
