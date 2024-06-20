'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentArea,
  DialogContentRow,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '../ui/form';
import { useEffect, useState } from 'react';
import { useCreateProject } from '@/services/createProject';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type ProjectDialogDefaultValues = z.infer<typeof formSchema>;

export default function ProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const createProject = useCreateProject();

  const defaultValues: ProjectDialogDefaultValues = {
    id: undefined,
    name: undefined,
  }; // TODO: get from store

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      name: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.id) {
      createProject.mutate({ name: values.name });
    }
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen, defaultValues]);

  const isCreate = !form.getValues('id');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[800px] ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      placeholder="Untitled"
                      className="col-span-2"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </DialogContentRow>
            </DialogContentArea>
            <DialogFooter>
              {!isCreate && (
                <Button variant="ghost_destructive" size={'sm'} type="button">
                  Delete this Project
                </Button>
              )}
              <span className="flex-1" />
              <Button variant="ghost" size={'sm'} type="button">
                Cancel
              </Button>
              <Button variant="black" size={'sm'} type="submit">
                {isCreate ? 'Create' : 'Update'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
