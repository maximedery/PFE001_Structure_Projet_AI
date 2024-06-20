'use client';

import DeleteProjectDialog from '@/components/global/delete-project-dialog';
import EquipmentTypeTable from '@/components/global/equipment-type-table';
import OccupationTable from '@/components/global/occupation-table';
import ProjectDialog from '@/components/global/project-dialog';
import TasksList from '@/components/global/tasks-list';
import WeekdaysPicker from '@/components/global/weekdays-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import { projectDialogStateAtom } from '@/stores/dialogs';
import { useSetAtom } from 'jotai';
import { CalendarDays, Plus, Search } from 'lucide-react';

export default function SettingsPage() {
  const setProjectDialogState = useSetAtom(projectDialogStateAtom);

  return (
    <>
      <div className="flex flex-row h-full overflow-hidden">
        <div className="flex flex-col h-full border-r-2 overflow-hidden">
          <div className="border-b p-2 flex items-center gap-3">
            <div className="text-sm font-medium">Multi-projects Settings</div>
            <Badge variant="label" size="lg">
              Enter the settings applicable to all projects
            </Badge>
          </div>
          <div className="flex flex-col h-full overflow-y-auto">
            <div className=" px-2 py-4 grid gap-x-6 gap-y-3 grid-cols-[200px,auto]">
              <div className="text-sm text-slate-500">
                Number of employees available in the company
              </div>
              <OccupationTable />
              <div className="text-sm text-slate-500">
                Number of equipments available in the company
              </div>
              <EquipmentTypeTable />
              <div className="text-sm text-slate-500 flex items-center">
                Desired start date
              </div>
              <div>
                <Button variant="outline_black" size={'sm'}>
                  <CalendarDays
                    size={18}
                    color={getTailwindColorValue('slate-950')}
                  />
                  12 mars. 2024
                </Button>
              </div>
              <div className="text-sm text-slate-500 flex items-center">
                Desired end date
              </div>
              <div>
                <Button variant="outline_black" size={'sm'}>
                  <CalendarDays
                    size={18}
                    color={getTailwindColorValue('slate-950')}
                  />
                  05 nov. 2024
                </Button>
              </div>
              <div className="text-sm text-slate-500 flex items-center">
                Duration
              </div>
              <div className="text-sm text-slate-500">7 month and 23 days</div>
              <div className="text-sm text-slate-500 flex items-center">
                Working days
              </div>
              <WeekdaysPicker />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full flex-1 overflow-hidden">
          <div className="border-b p-2 flex items-center gap-3">
            <div className="text-sm font-medium">Project & Task Settings</div>
            <Badge variant="label" size="lg">
              Add and configure projects & tasks to schedule.
            </Badge>
          </div>
          <div className="border-b p-2 flex items-center gap-3">
            <Input
              startIcon={Search}
              placeholder="Search"
              className="w-[250px]"
              onChange={() => {
                // TODO: Implement search
              }}
            />
            <span className="flex-1" />
            <Button
              variant="default"
              size={'sm'}
              onClick={() => {
                setProjectDialogState({ isOpen: true });
              }}
            >
              <Plus size={18} color={'white'} />
              Add a Project
            </Button>
          </div>
          <TasksList />
        </div>
      </div>
      <ProjectDialog />
      <DeleteProjectDialog />
    </>
  );
}
