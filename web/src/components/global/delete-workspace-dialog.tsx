'use client';

import { useAtom } from 'jotai';

import { useDeleteWorkspace } from '@/services/delete-workspace';
import { deleteWorkspaceDialogStateAtom } from '@/stores/dialogs';

import { DeleteDialog } from './delete-dialog';

export default function DeleteWorkspaceDialog() {
  const [deleteWorkspaceDialogState, setDeleteWorkspaceDialogState] = useAtom(
    deleteWorkspaceDialogStateAtom,
  );
  const deleteWorkspace = useDeleteWorkspace();

  if (!deleteWorkspaceDialogState.isOpen) {
    return null;
  }

  function handleDelete() {
    if (!deleteWorkspaceDialogState.isOpen) {
      return;
    }

    const workspaceId = deleteWorkspaceDialogState.id;

    if (!workspaceId) {
      throw new Error('No workspace id provided');
    }

    deleteWorkspace.mutate({ id: workspaceId });
    setDeleteWorkspaceDialogState({ isOpen: false });
  }

  return (
    <DeleteDialog
      isOpen={deleteWorkspaceDialogState.isOpen}
      onOpenChange={(newIsOpen) => {
        if (newIsOpen === false) {
          setDeleteWorkspaceDialogState({ isOpen: false });
        }
      }}
      itemName={deleteWorkspaceDialogState.name}
      onDelete={handleDelete}
    />
  );
}
