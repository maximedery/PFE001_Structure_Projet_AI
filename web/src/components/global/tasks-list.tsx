'use client';

import * as React from 'react';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
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
import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import {
  ChevronDown,
  ChevronRight,
  Circle,
  Ellipsis,
  Plus,
  Square,
} from 'lucide-react';
import pluralize from 'pluralize';
import { cn } from '@/lib/utils';
import TaskDialog from './task-dialog';
import { Row, useGetSettingTaskList } from '@/services/getSettingTaskList';

export const columns: ColumnDef<Row>[] = [
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
        <div className="text-xs text-slate-500 flex justify-center">
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
            <div className="text-sm pl-8">{getValue<string>()}</div>
          </div>
        );
      } else {
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
              <div className="w-4 flex justify-center items-center">
                <Circle
                  size={5}
                  color={getTailwindColorValue('slate-950')}
                  fill={getTailwindColorValue('slate-950')}
                />
              </div>
            )}
            <Square
              size={10}
              color={getTailwindColorValue('blue-500')}
              fill={getTailwindColorValue('blue-500')}
            />
            <div className="text-sm">{getValue<string>()}</div>
            <div className="text-slate-400 text-xs">{`(${pluralize(
              'task',
              rowData.subRows.length,
              true
            )})`}</div>
          </div>
        );
      }
    },
  },
  {
    id: 'actions',
    header: '',
    size: 116,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 justify-end">
          {row.original.type === 'project' && (
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <TaskDialog>
                <Button variant="ghost" size={'icon'}>
                  <Plus size={16} color={getTailwindColorValue('slate-950')} />
                </Button>
              </TaskDialog>
            </div>
          )}
          <Button variant="ghost" size={'icon'}>
            <Ellipsis size={18} color={getTailwindColorValue('slate-950')} />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default function TasksList() {
  const { data: settingTasks } = useGetSettingTaskList();

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
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto">
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
                          header.getContext()
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
                console.log('task row clicked', row.original);
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
                    row.original.type === 'task' && 'hover:bg-slate-50/40'
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
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Projects.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}