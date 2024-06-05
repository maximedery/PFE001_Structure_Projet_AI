'use client';

import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import { cn } from '@/lib/utils';
import { ChevronDown, Ellipsis, Plus, Square } from 'lucide-react';
import { Button } from '../ui/button';

interface Task {
  id: string;
  name: string;
  duration: number | null;
  start: string | null;
  end: string | null;
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export default function TasksList() {
  return (
    <div className="grid grid-cols-[40px,60px,auto]">
      <div className="w-full h-full flex items-center justify-center border-b border-slate-200 te">
        <Square size={16} color={getTailwindColorValue('slate-300')} />
      </div>
      <div className="w-full h-full flex items-center justify-start border-b border-slate-200 text-sm">
        Code
      </div>
      <div className="w-full h-full flex items-center justify-start py-2 border-b border-slate-200 text-sm">
        Name
      </div>
      {MOCK_DATA.map((project) => (
        <>
          <div className="w-full h-full flex items-center justify-center border-b border-slate-200 bg-slate-50">
            <Square size={16} color={getTailwindColorValue('slate-300')} />
          </div>
          <div className="w-full h-full flex items-center justify-start border-b font-medium border-slate-200  bg-slate-50 text-sm">
            {project.id}
          </div>
          <div className="flex bg-slate-50 border-slate-200 border-b w-full h-full items-center justify-start  pr-2">
            <ChevronDown size={16} color={getTailwindColorValue('slate-950')} />
            <div className="p-2 font-medium text-sm">{project.name}</div>
            <span className="flex-1" />
            <Button variant="ghost" size={'sm'}>
              <Plus size={16} color={getTailwindColorValue('slate-950')} />
            </Button>
            <Button variant="ghost" size={'sm'}>
              <Ellipsis size={18} color={getTailwindColorValue('slate-950')} />
            </Button>
          </div>
        </>
      ))}
    </div>
  );
}

const MOCK_DATA: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    tasks: [
      {
        id: '1',
        name: 'Task 1',
        duration: 2,
        start: '2022-01-01',
        end: '2022-01-03',
      },
      {
        id: '2',
        name: 'Task 2',
        duration: 3,
        start: '2022-01-04',
        end: '2022-01-06',
      },
      {
        id: '3',
        name: 'Task 3',
        duration: 1,
        start: '2022-01-07',
        end: '2022-01-08',
      },
    ],
  },
  {
    id: '2',
    name: 'Project 2',
    tasks: [
      {
        id: '1',
        name: 'Task 1',
        duration: 2,
        start: '2022-01-01',
        end: '2022-01-03',
      },
      {
        id: '2',
        name: 'Task 2',
        duration: 3,
        start: '2022-01-04',
        end: '2022-01-06',
      },
      {
        id: '3',
        name: 'Task 3',
        duration: 1,
        start: '2022-01-07',
        end: '2022-01-08',
      },
    ],
  },
  {
    id: '3',
    name: 'Project 3',
    tasks: [
      {
        id: '1',
        name: 'Task 1',
        duration: 2,
        start: '2022-01-01',
        end: '2022-01-03',
      },
      {
        id: '2',
        name: 'Task 2',
        duration: 3,
        start: '2022-01-04',
        end: '2022-01-06',
      },
      {
        id: '3',
        name: 'Task 3',
        duration: 1,
        start: '2022-01-07',
        end: '2022-01-08',
      },
    ],
  },
];
