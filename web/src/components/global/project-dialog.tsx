'use client';

import { useForm } from 'react-hook-form';
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
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { useEffect } from 'react';
import { useCreateProject } from '@/services/createProject';
import { useAtom, useSetAtom } from 'jotai';
import {
  deleteProjectDialogStateAtom,
  projectDialogStateAtom,
} from '@/stores/dialogs';
import { useUpdateProject } from '@/services/updateProject';
import { ColorPicker } from './color-picker';
import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';

const formSchema = z.object({
  name: z.string().nullable(),
  color: z.string().min(4).max(9).regex(/^#/),
});

export type ProjectDialogDefaultValues = z.infer<typeof formSchema>;

const initialValues: ProjectDialogDefaultValues = {
  color: getTailwindColorValue('blue-500'),
  name: null,
};

export default function ProjectDialog() {
  const [projectDialogState, setProjectDialogState] = useAtom(
    projectDialogStateAtom
  );
  const setDeleteProjectDialogState = useSetAtom(deleteProjectDialogStateAtom);

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (projectDialogState.isOpen && 'id' in projectDialogState) {
      form.reset(projectDialogState.defaultValues);
    } else {
      form.reset(initialValues);
    }
  }, [projectDialogState]);

  if (!projectDialogState.isOpen) return null;
  const isUpdate = 'id' in projectDialogState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!projectDialogState.isOpen) return null;

    if (!isUpdate) {
      createProject.mutate(values);
    } else {
      updateProject.mutate({ id: projectDialogState.id, ...values });
    }
    setProjectDialogState({ isOpen: false });
  }

  return (
    <Dialog
      open={projectDialogState.isOpen}
      onOpenChange={(newIsOpen) => {
        if (newIsOpen === false) {
          setProjectDialogState({ isOpen: false });
        }
      }}
    >
      <DialogContent className="max-w-[800px] ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.error(error);
            })}
          >
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-3">
                  <div className="text-slate-500">Project</div>
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
                      placeholder="Enter project name"
                      className="col-span-2"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>Color</Label>
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <ColorPicker
                        color={field.value}
                        setColor={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
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
                    setProjectDialogState({ isOpen: false });
                    setDeleteProjectDialogState({
                      isOpen: true,
                      id: projectDialogState.id,
                      name: form.getValues('name'),
                    });
                  }}
                >
                  Delete this Project
                </Button>
              )}
              <span className="flex-1" />
              <Button
                variant="ghost"
                size={'sm'}
                type="button"
                onClick={() => setProjectDialogState({ isOpen: false })}
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
