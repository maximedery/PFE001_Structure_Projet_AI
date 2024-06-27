'use client';

import { Gantt as GanttComponent, Task, ViewMode } from 'gantt-task-react';
import { ChevronDown, Square } from 'lucide-react';

import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';
import { COLUMN_WIDTH } from '@/helpers/global';

const tasks: Task[] = initTasks();

export default function Gantt() {
  return (
    <GanttComponent
      tasks={tasks}
      TaskListHeader={TaskListHeader}
      TaskListTable={TaskListTable}
      headerHeight={32}
      rowHeight={32}
      fontSize={'12px'}
      viewMode={ViewMode.Day}
      preStepsCount={1}
      columnWidth={COLUMN_WIDTH}
    />
  );
}

function TaskListHeader() {
  return (
    <div className="flex h-8 w-[165px] items-center border-y border-r border-slate-200 bg-slate-50 px-2">
      <div className="whitespace-nowrap text-xs ">Projects & Tasks</div>
    </div>
  );
}

function TaskListTable(props: { tasks: Task[] }) {
  return (
    <div>
      {props.tasks.map((task) => {
        return (
          <div
            key={task.id}
            className="flex items-center border-b border-r border-slate-200"
          >
            <div className="-mb-px flex h-8 items-center gap-2 px-2">
              {task.type === 'project' && (
                <>
                  <ChevronDown
                    size={18}
                    color={getTailwindColorValue('slate-950')}
                  />
                  <Square
                    size={8}
                    color={getTailwindColorValue('blue-500')}
                    fill={getTailwindColorValue('blue-500')}
                  />
                </>
              )}
              {/* {task.type === 'task' && (
              )}
              {task.type === 'milestone' && (
              )} */}
              <div className="text-xs">{task.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function initTasks() {
  const currentDate = new Date();
  const result: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: 'Project 1',
      id: 'ProjectSample',
      progress: 25,
      type: 'project',
      hideChildren: false,
      displayOrder: 1,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28,
      ),
      name: 'Idea',
      id: 'Task 0',
      progress: 45,
      type: 'task',
      project: 'ProjectSample',
      displayOrder: 2,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: 'Research',
      id: 'Task 1',
      progress: 25,
      dependencies: ['Task 0'],
      type: 'task',
      project: 'ProjectSample',
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: 'Discussion with team',
      id: 'Task 2',
      progress: 10,
      dependencies: ['Task 1'],
      type: 'task',
      project: 'ProjectSample',
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: 'Developing',
      id: 'Task 3',
      progress: 2,
      dependencies: ['Task 2'],
      type: 'task',
      project: 'ProjectSample',
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: 'Review',
      id: 'Task 4',
      type: 'task',
      progress: 70,
      dependencies: ['Task 2'],
      project: 'ProjectSample',
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: 'Release',
      id: 'Task 6',
      progress: currentDate.getMonth(),
      type: 'milestone',
      dependencies: ['Task 4'],
      project: 'ProjectSample',
      displayOrder: 7,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: 'Party Time',
      id: 'Task 9',
      progress: 0,
      isDisabled: true,
      type: 'task',
    },
  ];
  return result;
}
