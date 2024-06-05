import OccupationTable from '@/components/app/occupation-table';
import TasksList from '@/components/app/tasks-list';
import WeekdaysPicker from '@/components/app/weekdays-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import { CalendarDays, Plus, Search } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b p-2 flex items-center gap-3">
        <div className="text-sm font-medium">Multi-projects Settings</div>
        <Badge variant="label" size="lg">
          Enter the settings applicable to all projects
        </Badge>
      </div>
      <div className="border-b px-2 py-4 grid gap-x-6 gap-y-3 grid-cols-[200px,auto]">
        <div className="text-sm text-slate-500">
          Number of resources available in the company
        </div>
        <OccupationTable />
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
        <div className="text-sm text-slate-500 flex items-center">Duration</div>
        <div className="text-sm text-slate-500">7 month and 23 days</div>
        <div className="text-sm text-slate-500 flex items-center">
          Working days
        </div>
        <WeekdaysPicker />
      </div>
      <div className="border-b p-2 flex items-center gap-3">
        <div className="text-sm font-medium">Project & Task Settings</div>
        <Badge variant="label" size="lg">
          Add and configure projects & tasks to schedule.
        </Badge>
      </div>
      <div className="border-b p-2 flex items-center gap-3">
        <Input startIcon={Search} placeholder="Search" className="w-[250px]" />
        <span className="flex-1" />
        <Button variant="default" size={'sm'}>
          <Plus size={18} color={'white'} />
          Add a Project
        </Button>
      </div>
      <TasksList />
    </div>
  );
}
