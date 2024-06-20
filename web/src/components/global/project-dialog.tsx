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
import { ReactNode, useEffect, useState } from 'react';
import { useCreateProject } from '@/services/createProject';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export default function ProjectDialog({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const createProject = useCreateProject();

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
      form.reset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
              {!!form.getValues('id') && (
                <Button variant="ghost_destructive" size={'sm'}>
                  Delete this Project
                </Button>
              )}
              <span className="flex-1" />
              <Button variant="ghost" size={'sm'}>
                Cancel
              </Button>
              <Button variant="black" size={'sm'} type="submit">
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
