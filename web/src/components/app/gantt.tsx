'use client';

import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import { COLUMN_WIDTH } from '@/helpers/global';
import { Gantt as GanttComponent, Task, ViewMode } from 'gantt-task-react';
import { ChevronDown, Square } from 'lucide-react';

let tasks: Task[] = initTasks();

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
    <div className="h-8 bg-slate-50 px-2 flex items-center w-[165px] border-r border-y border-slate-200">
      <div className="text-xs whitespace-nowrap ">Projects & Tasks</div>
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
            <div className="flex items-center h-8 px-2 gap-2 -mb-px">
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
  const tasks: Task[] = [
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
        28
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
  return tasks;
}
