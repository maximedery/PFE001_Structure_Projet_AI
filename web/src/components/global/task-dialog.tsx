'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import EquipmentTypeTable from './equipment-type-table';
import { MultiSelect } from './multi-select';
import OccupationTable from './occupation-table';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { taskDialogStateAtom } from '@/stores/dialogs';
import { useAtom } from 'jotai';
import { Form, FormField } from '../ui/form';
import { useCreateTask } from '@/services/create-task';
import { DatePicker } from '../ui/date-picker';
import { useUpdateTask } from '@/services/update-task';
import { useGetTaskOptions } from '@/helpers/useGetTaskOptions';

const formSchema = z.object({
  name: z.string().nullable(),
  start: z.string().nullable(),
  end: z.string().nullable(),
  predecessorIds: z.array(z.string()),
  duration: z
    .number()
    .min(0, { message: 'Duration must be positive' })
    .nullable(),
  cost: z.number().min(0, { message: 'Cost must be positive' }).nullable(),
  importance: z.enum(['asap', 'high', 'medium', 'low']),
  weatherEffect: z.enum(['none', 'slight', 'significant', 'impossible']),
});

export type TaskDialogDefaultValues = z.infer<typeof formSchema>;

const initialValues: TaskDialogDefaultValues = {
  name: null,
  start: null,
  end: null,
  predecessorIds: [],
  duration: null,
  cost: null,
  importance: 'medium',
  weatherEffect: 'none',
};

export default function TaskDialog() {
  const [taskDialogState, setTaskDialogState] = useAtom(taskDialogStateAtom);

  const taskOptions = useGetTaskOptions({
    projectId: taskDialogState.isOpen ? taskDialogState.projectId : undefined,
  });

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (taskDialogState.isOpen && 'id' in taskDialogState) {
      form.reset(taskDialogState.defaultValues);
    } else {
      form.reset(initialValues);
    }
  }, [taskDialogState]);

  if (!taskDialogState.isOpen) return null;
  const isUpdate = 'id' in taskDialogState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!taskDialogState.isOpen) return null;

    if (!isUpdate) {
      createTask.mutate({
        ...values,
        projectId: taskDialogState.projectId,
      });
    } else {
      updateTask.mutate({ id: taskDialogState.id, ...values });
    }
    setTaskDialogState({ isOpen: false });
  }

  return (
    <Dialog
      open={taskDialogState.isOpen}
      onOpenChange={(newIsOpen) => {
        if (newIsOpen === false) {
          setTaskDialogState({ isOpen: false });
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
                  <div className="text-slate-500">Task</div>
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
                      placeholder="Enter task name"
                      className="col-span-2"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>Start</Label>
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <DatePicker value={field.value} onChange={field.onChange} />
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>End</Label>
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <DatePicker value={field.value} onChange={field.onChange} />
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>Predecessor</Label>
                <FormField
                  control={form.control}
                  name="predecessorIds"
                  render={({ field }) => {
                    return (
                      <MultiSelect
                        options={taskOptions}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select tasks"
                        maxCount={2}
                        className="col-span-3"
                      />
                    );
                  }}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>Duration to finish the task</Label>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <Input
                      className="col-span-1"
                      suffix={'hours'}
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>Cost</Label>
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <Input
                      className="col-span-1"
                      suffix={'$'}
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>Importance</Label>
                <FormField
                  control={form.control}
                  name="importance"
                  render={({ field }) => (
                    <ToggleGroup
                      type="single"
                      className="col-span-3 justify-start"
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <ToggleGroupItem
                        value="asap"
                        size={'sm'}
                        variant={'blue'}
                      >
                        ASAP
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="high"
                        size={'sm'}
                        variant={'blue'}
                      >
                        High
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="medium"
                        size={'sm'}
                        variant={'blue'}
                      >
                        Medium
                      </ToggleGroupItem>
                      <ToggleGroupItem value="low" size={'sm'} variant={'blue'}>
                        Low
                      </ToggleGroupItem>
                    </ToggleGroup>
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label>Weather Effect</Label>
                <FormField
                  control={form.control}
                  name="weatherEffect"
                  render={({ field }) => (
                    <ToggleGroup
                      type="single"
                      className="col-span-3 justify-start"
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <ToggleGroupItem
                        value="none"
                        size={'sm'}
                        variant={'blue'}
                      >
                        None
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="slight"
                        size={'sm'}
                        variant={'blue'}
                      >
                        Slight slowdown
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="significant"
                        size={'sm'}
                        variant={'blue'}
                      >
                        Significant slowdown
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="impossible"
                        size={'sm'}
                        variant={'blue'}
                      >
                        Impossible
                      </ToggleGroupItem>
                    </ToggleGroup>
                  )}
                />
              </DialogContentRow>
              <DialogContentRow>
                <Label className="self-start">
                  Employees needed to complete the task
                </Label>
                <OccupationTable className="col-span-4" />
              </DialogContentRow>
              <DialogContentRow>
                <Label className="self-start">
                  Equipments needed to complete the task
                </Label>
                <EquipmentTypeTable className="col-span-4" />
              </DialogContentRow>
            </DialogContentArea>
            <DialogFooter>
              <Button variant="ghost_destructive" size={'sm'}>
                Delete this task
              </Button>
              <span className="flex-1" />
              <Button
                variant="ghost"
                size={'sm'}
                type="button"
                onClick={() => setTaskDialogState({ isOpen: false })}
              >
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
