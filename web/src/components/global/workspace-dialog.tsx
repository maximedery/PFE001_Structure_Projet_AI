'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateWorkspace } from '@/services/create-workspace';
import { useUpdateWorkspace } from '@/services/update-workspace';
import {
  deleteWorkspaceDialogStateAtom,
  workspaceDialogStateAtom,
} from '@/stores/dialogs';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogContentArea,
  DialogContentRow,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Form, FormField } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const formSchema = z.object({
  name: z.string().nullable(),
});

export type WorkspaceDialogDefaultValues = z.infer<typeof formSchema>;

const initialValues: WorkspaceDialogDefaultValues = {
  name: null,
};

export default function WorkspaceDialog() {
  const [workspaceDialogState, setWorkspaceDialogState] = useAtom(
    workspaceDialogStateAtom,
  );
  const setDeleteWorkspaceDialogState = useSetAtom(
    deleteWorkspaceDialogStateAtom,
  );

  const createWorkspace = useCreateWorkspace();
  const updateWorkspace = useUpdateWorkspace();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (workspaceDialogState.isOpen && 'id' in workspaceDialogState) {
      form.reset(workspaceDialogState.defaultValues);
    } else {
      form.reset(initialValues);
    }
  }, [workspaceDialogState, form]);

  if (!workspaceDialogState.isOpen) return null;
  const isUpdate = 'id' in workspaceDialogState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!workspaceDialogState.isOpen) return;

    if (!isUpdate) {
      createWorkspace.mutate(values);
    } else {
      updateWorkspace.mutate({ id: workspaceDialogState.id, ...values });
    }
    setWorkspaceDialogState({ isOpen: false });
  }

  return (
    <Dialog
      open={workspaceDialogState.isOpen}
      onOpenChange={(newIsOpen) => {
        if (newIsOpen === false) {
          setWorkspaceDialogState({ isOpen: false });
        }
      }}
    >
      <DialogContent className="max-w-[800px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.error(error);
            })}
          >
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-3">
                  <div className="text-slate-500">Workspace</div>
                  <div className="text-slate-500">/</div>
                  <div>{form.getValues('name') || 'Untitled'}</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <DialogContentArea>
              <DialogContentRow>
                <Label>Name</Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      placeholder="Enter workspace name"
                      className="col-span-2"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </DialogContentRow>
            </DialogContentArea>
            <DialogFooter>
              {isUpdate && (
                <Button
                  variant="ghost_destructive"
                  size={'sm'}
                  type="button"
                  onClick={() => {
                    setWorkspaceDialogState({ isOpen: false });
                    setDeleteWorkspaceDialogState({
                      isOpen: true,
                      id: workspaceDialogState.id,
                      name: form.getValues('name'),
                    });
                  }}
                >
                  Delete this Workspace
                </Button>
              )}
              <span className="flex-1" />
              <Button
                variant="ghost"
                size={'sm'}
                type="button"
                onClick={() => setWorkspaceDialogState({ isOpen: false })}
              >
                Cancel
              </Button>
              <Button variant="black" size={'sm'} type="submit">
                {isUpdate ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
