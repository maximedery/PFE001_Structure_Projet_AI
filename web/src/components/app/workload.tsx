'use client';

import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import dayjs from 'dayjs';
import { Gantt as GanttComponent, Task } from 'gantt-task-react';
import { size } from 'lodash';
import { ChevronRight } from 'lucide-react';

let workload: EmployeeWorkload[] = initWorkload();

export default function Workload() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[165px] border-r border-slate-200">
        {workload.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center h-8 px-2 border-b border-slate-200 gap-2"
          >
            <ChevronRight
              size={18}
              color={getTailwindColorValue('slate-950')}
            />
            <div className="text-xs whitespace-nowrap">{employee.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WorkloadEntry {
  date: Date;
  hours: number;
}

interface EmployeeWorkload {
  id: string;
  name: string;
  workloads: WorkloadEntry[];
}

function getRandomHours() {
  return Math.floor(Math.random() * 9); // Random hours between 0 and 8
}

export function initWorkload(): EmployeeWorkload[] {
  const currentDate = dayjs();
  const firstDay = currentDate.startOf('month').toDate();

  const employeeNames = [
    'Field Employee 1',
    'Field Employee 2',
    'Field Employee 3',
    'Field Employee 4',
    'Field Employee 5',
    'Field Employee 6',
  ];

  const employeeWorkloads: EmployeeWorkload[] = employeeNames.map(
    (name, index) => {
      const workloads: WorkloadEntry[] = [];
      for (let i = 0; i < 30; i++) {
        const date = dayjs(firstDay).add(i, 'day').toDate();
        const hours = getRandomHours();
        workloads.push({ date, hours });
      }
      return {
        id: (index + 1).toString(),
        name,
        workloads,
      };
    }
  );

  return employeeWorkloads;
}
