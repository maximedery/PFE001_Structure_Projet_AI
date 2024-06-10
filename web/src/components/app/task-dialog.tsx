'use client';

import { Turtle, Cat, Dog, Rabbit, Fish } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
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
import EquipmentTypeTable from './equipment-type-table';
import { MultiSelect } from './multi-select';
import OccupationTable from './occupation-table';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

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
      <DialogContent className="max-w-[800px] ">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-3">
              <div className="text-slate-500">Task</div>
              <div className="text-slate-500">/</div>
              <div>{'Excavation'}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogContentArea>
          <DialogContentRow>
            <Label>Name</Label>
            <Input id="name" value="Tanzim" className="col-span-2" />
          </DialogContentRow>
          <DialogContentRow>
            <Label>Predecessor</Label>
            <MultiSelect
              options={MOCK_TASK_LIST}
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              placeholder="Select tasks"
              maxCount={2}
              className="col-span-3"
            />
          </DialogContentRow>
          <DialogContentRow>
            <Label>Importance</Label>
            <ToggleGroup
              type="single"
              className="col-span-3 justify-start"
              defaultValue="medium"
            >
              <ToggleGroupItem value="asap" size={'sm'} variant={'blue'}>
                ASAP
              </ToggleGroupItem>
              <ToggleGroupItem value="high" size={'sm'} variant={'blue'}>
                High
              </ToggleGroupItem>
              <ToggleGroupItem value="medium" size={'sm'} variant={'blue'}>
                Medium
              </ToggleGroupItem>
              <ToggleGroupItem value="low" size={'sm'} variant={'blue'}>
                Low
              </ToggleGroupItem>
            </ToggleGroup>
          </DialogContentRow>
          <DialogContentRow>
            <Label>Weather Effect</Label>
            <ToggleGroup
              type="single"
              className="col-span-3 justify-start"
              defaultValue="none"
            >
              <ToggleGroupItem value="none" size={'sm'} variant={'blue'}>
                None
              </ToggleGroupItem>
              <ToggleGroupItem value="slight" size={'sm'} variant={'blue'}>
                Slight slowdown
              </ToggleGroupItem>
              <ToggleGroupItem value="significant" size={'sm'} variant={'blue'}>
                Significant slowdown
              </ToggleGroupItem>
              <ToggleGroupItem value="impossible" size={'sm'} variant={'blue'}>
                Impossible
              </ToggleGroupItem>
            </ToggleGroup>
          </DialogContentRow>
          <DialogContentRow>
            <Label>Duration to finish the task</Label>
            <Input className="col-span-1" suffix={'hours'} type="number" />
          </DialogContentRow>
          <DialogContentRow>
            <Label>Cost</Label>
            <Input className="col-span-1" suffix={'$'} type="number" />
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
