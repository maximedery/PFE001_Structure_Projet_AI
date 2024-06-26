'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogContentArea,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useAtom } from 'jotai';
import { deleteProjectDialogStateAtom } from '@/stores/dialogs';
import { useDeleteProject } from '@/services/delete-project';

export default function DeleteProjectDialog() {
  const [deleteProjectDialogState, setDeleteProjectDialogState] = useAtom(
    deleteProjectDialogStateAtom
  );
  const deleteProject = useDeleteProject();

  if (!deleteProjectDialogState.isOpen) {
    return null;
  }

  function handleDelete() {
    if (!deleteProjectDialogState.isOpen) {
      return null;
    }

    const projectId = deleteProjectDialogState.id;

    if (!projectId) {
      throw new Error('No project id provided');
    }

    deleteProject.mutate({ id: projectId });
    setDeleteProjectDialogState({ isOpen: false });
  }

  return (
    <Dialog
      open={deleteProjectDialogState.isOpen}
      onOpenChange={(newIsOpen) => {
        if (newIsOpen === false) {
          setDeleteProjectDialogState({ isOpen: false });
        }
      }}
    >
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <DialogContentArea>
          <span>
            Are you sure you want to delete{' '}
            <span className="font-semibold ">
              {deleteProjectDialogState.name || 'Untitled'}
            </span>{' '}
            ?
          </span>
        </DialogContentArea>
        <DialogFooter>
          <Button
            variant="ghost"
            size={'sm'}
            type="button"
            onClick={() => setDeleteProjectDialogState({ isOpen: false })}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size={'sm'}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
