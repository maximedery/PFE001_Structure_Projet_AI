'use client';

import { useSetAtom } from 'jotai';
import { Plus, Search } from 'lucide-react';

import TasksList from '@/components/global/tasks-list';
import WeekdaysPicker from '@/components/global/weekdays-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getDurationString } from '@/helpers/get-duration-string';
import { useGetWorkspace } from '@/services/get-workspace';
import { useUpdateWorkspace } from '@/services/update-workspace';
import { projectDialogStateAtom } from '@/stores/dialogs';

export default function SettingsPage() {
  const setProjectDialogState = useSetAtom(projectDialogStateAtom);

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
              <div className=" grid grid-cols-[200px,auto] gap-x-6 gap-y-3 px-2 py-4">
                {/* TODO: Add OccupationTable */}
                {/* <div className="text-sm text-slate-500">
                Number of employees available in the company
              </div>
              <OccupationTable />
              <div className="text-sm text-slate-500">
                Number of equipments available in the company
              </div>
              <EquipmentTypeTable /> */}
                <div className="flex items-center text-sm text-slate-500">
                  Desired start date
                </div>
                <div>
                  <DatePicker
                    value={data.start}
                    onChange={(value) => {
                      updateWorkspace.mutate({
                        id: data.id,
                        start: value,
                      });
                    }}
                  />
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  Desired end date
                </div>
                <div>
                  <DatePicker
                    value={data.end}
                    onChange={(value) => {
                      updateWorkspace.mutate({
                        id: data.id,
                        end: value,
                      });
                    }}
                  />
                </div>
                {duration && (
                  <>
                    <div className="flex items-center text-sm text-slate-500">
                      Duration
                    </div>
                    <div className="text-sm text-slate-500">{duration}</div>
                  </>
                )}
                <div className="flex items-center text-sm text-slate-500">
                  Working days
                </div>
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
              value={null}
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
    </>
  );
}
