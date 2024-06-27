'use client';

import { useAtom } from 'jotai';
import React from 'react';

import { useDeleteTask } from '@/services/delete-task';
import { deleteTaskDialogStateAtom } from '@/stores/dialogs';

import { DeleteDialog } from './delete-dialog';

export default function DeleteTaskDialog() {
  const [deleteTaskDialogState, setDeleteTaskDialogState] = useAtom(
    deleteTaskDialogStateAtom,
  );
  const deleteTask = useDeleteTask();

  if (!deleteTaskDialogState.isOpen) {
    return null;
  }

  function handleDelete() {
    if (!deleteTaskDialogState.isOpen) {
      return;
    }

    const taskId = deleteTaskDialogState.id;

    if (!taskId) {
      throw new Error('No task id provided');
    }

    deleteTask.mutate({ id: taskId });
    setDeleteTaskDialogState({ isOpen: false });
  }

  return (
    <DeleteDialog
      isOpen={deleteTaskDialogState.isOpen}
      onOpenChange={(newIsOpen) => {
        if (newIsOpen === false) {
          setDeleteTaskDialogState({ isOpen: false });
        }
      }}
      itemName={deleteTaskDialogState.name}
      onDelete={handleDelete}
    />
  );
}
