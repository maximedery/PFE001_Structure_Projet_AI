'use client';

import { useAtom, useSetAtom } from 'jotai';
import { Plus, Search } from 'lucide-react';

import TasksList from '@/components/global/tasks-list';
import WeekdaysPicker from '@/components/global/weekdays-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getDurationString } from '@/helpers/get-duration-string';
import { useGetWorkspace } from '@/services/get-workspace';
import { useUpdateWorkspace } from '@/services/update-workspace';
import { projectDialogStateAtom } from '@/stores/dialogs';
import { taskListSearchQueryAtom } from '@/stores/general';

export default function SettingsPage() {
  const setProjectDialogState = useSetAtom(projectDialogStateAtom);
  const [taskListSearchQuery, setTaskListSearchQuery] = useAtom(
    taskListSearchQueryAtom,
  );

  const { data, isLoading } = useGetWorkspace();
  const updateWorkspace = useUpdateWorkspace();

  const duration =
    data?.start && data?.end
      ? getDurationString(data?.start, data?.end)
      : undefined;

  return (
    <>
      <div className="flex h-full flex-row overflow-hidden">
        <div className="flex h-full flex-col overflow-hidden border-r-2">
          <div className="flex items-center gap-3 border-b p-2">
            <div className="text-sm font-medium">Multi-projects Settings</div>
            <Badge variant="label" size="lg">
              Enter the settings applicable to all projects
            </Badge>
          </div>
          <div className="flex h-full flex-col overflow-y-auto">
            {isLoading && (
              <div className="flex flex-1 items-center justify-center">
                <LoadingSpinner className="text-gray-300" />
              </div>
            )}
            {!isLoading && !data && (
              <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
                Workspace not found
              </div>
            )}
            {!isLoading && data && (
              <div className="grid grid-cols-[200px,auto] gap-x-6 gap-y-3 px-2 py-4">
                {/* TODO: Add OccupationTable */}
                {/* <div className="text-sm text-slate-500">
                Number of employees available in the company
              </div>
              <OccupationTable />
              <div className="text-sm text-slate-500">
                Number of equipments available in the company
              </div>
              <EquipmentTypeTable /> */}
                <Label size="sm">Desired start date</Label>
                <DatePicker
                  value={data.start}
                  onChange={(value) => {
                    updateWorkspace.mutate({
                      id: data.id,
                      start: value,
                    });
                  }}
                />
                <Label size="sm">Desired end date</Label>
                <DatePicker
                  value={data.end}
                  onChange={(value) => {
                    updateWorkspace.mutate({
                      id: data.id,
                      end: value,
                    });
                  }}
                />
                {duration && (
                  <>
                    <Label size="sm">Duration</Label>
                    <Label size="sm">{duration}</Label>
                  </>
                )}

                <Label size="sm">Number of Employees</Label>
                <Input
                  className="w-36"
                  suffix={'employees'}
                  type="number"
                  value={data.nbOfEmployees || '0'}
                  onChange={(event) => {
                    updateWorkspace.mutate({
                      id: data.id,
                      nbOfEmployees: +event.target.value,
                    });
                  }}
                />
                <Label size="sm">Working days</Label>
                <WeekdaysPicker
                  value={data.workingDays || []}
                  onChange={(value) => {
                    updateWorkspace.mutate({
                      id: data.id,
                      workingDays: value,
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b p-2">
            <div className="text-sm font-medium">Project & Task Settings</div>
            <Badge variant="label" size="lg">
              Add and configure projects & tasks to schedule.
            </Badge>
          </div>
          <div className="flex items-center gap-3 border-b p-2">
            <Input
              startIcon={Search}
              placeholder="Search"
              className="w-[250px]"
              value={taskListSearchQuery}
              onChange={(e) => setTaskListSearchQuery(e.target.value)}
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
    </>
  );
}
