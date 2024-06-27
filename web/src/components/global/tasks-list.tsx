'use client';

import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSetAtom } from 'jotai';
import {
  ChevronDown,
  ChevronRight,
  Circle,
  Ellipsis,
  Plus,
  Square,
} from 'lucide-react';
import pluralize from 'pluralize';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';
import { cn } from '@/lib/utils';
import {
  ProjectTaskSettingListRow,
  useGetProjectTaskSettingList,
} from '@/services/get-project-task-setting-list';
import {
  deleteProjectDialogStateAtom,
  deleteTaskDialogStateAtom,
  projectDialogStateAtom,
  taskDialogStateAtom,
} from '@/stores/dialogs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LoadingSpinner } from '../ui/loading-spinner';

export const columns: ColumnDef<ProjectTaskSettingListRow>[] = [
  {
    id: 'select',
    size: 32,
    enableResizing: false,
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: 'Code',
    size: 40,
    cell: ({ getValue }) => {
      return (
        <div className="flex justify-center text-xs text-slate-500">
          {getValue<string>()}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue, row, cell }) => {
      const rowData = cell.row.original;

      if (rowData.type === 'task') {
        return (
          <div className="flex items-center gap-2">
            <div className="pl-8 text-sm">
              {getValue<string>() || 'Untitled'}
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2">
          {row.getCanExpand() ? (
            row.getIsExpanded() ? (
              <ChevronDown
                size={16}
                color={getTailwindColorValue('slate-950')}
              />
            ) : (
              <ChevronRight
                size={16}
                color={getTailwindColorValue('slate-950')}
              />
            )
          ) : (
            <div className="flex w-4 items-center justify-center">
              <Circle
                size={5}
                color={getTailwindColorValue('slate-950')}
                fill={getTailwindColorValue('slate-950')}
              />
            </div>
          )}
          <Square size={10} color={rowData.color} fill={rowData.color} />
          <div className="text-sm">{getValue<string>() || 'Untitled'}</div>
          <div className="text-xs text-slate-400">{`(${pluralize(
            'task',
            rowData.subRows.length,
            true,
          )})`}</div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: '',
    size: 116,
    cell: function ActionCell({ row }) {
      const setProjectDialogState = useSetAtom(projectDialogStateAtom);
      const setTaskDialogState = useSetAtom(taskDialogStateAtom);
      const setDeleteProjectDialogState = useSetAtom(
        deleteProjectDialogStateAtom,
      );
      const setDeleteTaskDialogState = useSetAtom(deleteTaskDialogStateAtom);

      const rowData = row.original;

      return (
        <div className="flex justify-end gap-1">
          {rowData.type === 'project' && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button
                variant="ghost"
                size={'icon'}
                onClick={(e) => {
                  e.stopPropagation();
                  setTaskDialogState({
                    isOpen: true,
                    projectId: rowData.id,
                  });
                }}
              >
                <Plus size={16} color={getTailwindColorValue('slate-950')} />
              </Button>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={'icon'}>
                <Ellipsis
                  size={18}
                  color={getTailwindColorValue('slate-950')}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom">
              {rowData.type === 'project' ? (
                // Project Dropdown
                <>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setProjectDialogState({
                        isOpen: true,
                        id: rowData.id,
                        defaultValues: {
                          ...rowData,
                        },
                      });
                    }}
                  >
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteProjectDialogState({
                        isOpen: true,
                        id: rowData.id,
                        name: rowData.name,
                      });
                    }}
                    className="text-red-500"
                  >
                    Delete Project
                  </DropdownMenuItem>
                </>
              ) : (
                // Task Dropdown
                <>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskDialogState({
                        isOpen: true,
                        id: rowData.id,
                        projectId: rowData.projectId,
                        defaultValues: {
                          ...rowData,
                        },
                      });
                    }}
                  >
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTaskDialogState({
                        isOpen: true,
                        id: rowData.id,
                        name: rowData.name,
                      });
                    }}
                    className="text-red-500"
                  >
                    Delete Task
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default function TasksList() {
  const { data: settingTasks, isLoading } = useGetProjectTaskSettingList();
  const setTaskDialogState = useSetAtom(taskDialogStateAtom);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data: settingTasks || [],
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => (row.type === 'project' ? row.subRows : undefined),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  });

  React.useEffect(() => {
    table.toggleAllRowsExpanded();
  }, [table]);

  return (
    <div className="flex h-full flex-col overflow-auto">
      <Table className="border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.column.getSize() || 'auto',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const projectRowOnClick = row.getCanExpand()
                ? row.getToggleExpandedHandler()
                : undefined;

              const taskRowOnClick = () => {
                const rowData = row.original;

                if (rowData.type === 'project') return;

                setTaskDialogState({
                  isOpen: true,
                  id: rowData.id,
                  projectId: rowData.projectId,
                  defaultValues: {
                    ...rowData,
                  },
                });
              };

              const rowOnClick =
                row.original.type === 'project'
                  ? projectRowOnClick
                  : taskRowOnClick;

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    !!rowOnClick && 'cursor-pointer',
                    row.original.type === 'project' && 'bg-slate-50',
                    row.original.type === 'task' && 'hover:bg-slate-50/40',
                  )}
                  onClick={rowOnClick}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize() || 'auto',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  {isLoading ? (
                    <LoadingSpinner className="text-gray-300" />
                  ) : (
                    'No Projects.'
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
