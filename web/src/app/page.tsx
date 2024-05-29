import OccupationTable from '@/components/app/occupation-table';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  return (
    <div className="flex flex-col ">
      <div className="border-b p-2 flex items-center gap-2">
        <div className="text-sm font-medium">Multi-projects Settings</div>
        <Badge variant="label" size="lg">
          Enter the settings applicable to all projects.
        </Badge>
      </div>
      <div className="border-b p-2 grid gap-x-6 gap-y-2 grid-cols-[200px,auto]">
        <div className="text-sm text-slate-500">
          Number of resources available in the company
        </div>
        <OccupationTable />
      </div>
    </div>
  );
}
