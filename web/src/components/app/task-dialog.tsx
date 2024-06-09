'use client';

import { Turtle, Cat, Dog, Rabbit, Fish } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import EquipmentTypeTable from './equipment-type-table';
import { MultiSelect } from './multi-select';
import OccupationTable from './occupation-table';

const MOCK_TASK_LIST = [
  { value: '1-1', label: '1-1 - Project 1 - Task 1' },
  { value: '1-2', label: '1-2 - Project 1 - Task 1' },
  { value: '1-3', label: '1-3 - Project 1 - Task 1' },
  { value: '2-1', label: '2-1 - Project 2 - Task 1' },
  { value: '2-2', label: '2-2 - Project 2 - Task 2' },
];

export default function TaskDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    '1-1',
    '2-2',
  ]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-3">
              <div className="text-slate-500">Task</div>
              <div className="text-slate-500">/</div>
              <div>{'Excavation'}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ContentArea>
          <ContentRow>
            <Label>Name</Label>
            <Input id="name" value="Tanzim" className="col-span-2" />
          </ContentRow>
          <ContentRow>
            <Label className="self-start">
              Employees needed to complete the task
            </Label>
            <OccupationTable className="col-span-4" />
          </ContentRow>
          <ContentRow>
            <Label className="self-start">
              Equipments needed to complete the task
            </Label>
            <EquipmentTypeTable className="col-span-4" />
          </ContentRow>
          <ContentRow>
            <Label>Predecessor</Label>
            <MultiSelect
              options={MOCK_TASK_LIST}
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              placeholder="Select tasks"
              maxCount={2}
              className="col-span-3"
            />
          </ContentRow>
        </ContentArea>
        <DialogFooter>
          <Button variant="ghost_destructive" size={'sm'}>
            Delete this task
          </Button>
          <span className="flex-1" />
          <Button variant="ghost" size={'sm'}>
            Cancel
          </Button>
          <Button variant="black" size={'sm'}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ContentArea({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4 px-4">{children}</div>;
}

function ContentRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-5 items-center gap-4">{children}</div>;
}
