'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
  Ellipsis,
  Plus,
  Square,
} from 'lucide-react';
import pluralize from 'pluralize';

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

export const columns: ColumnDef<Project>[] = [
  {
    id: 'select',
    size: 32,
    enableResizing: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue, row, cell }) => (
      <div className="flex items-center gap-2">
        {row.getIsExpanded() ? (
          <ChevronDown size={16} color={getTailwindColorValue('slate-950')} />
        ) : (
          <ChevronRight size={16} color={getTailwindColorValue('slate-950')} />
        )}
        <Square
          size={10}
          color={getTailwindColorValue('blue-500')}
          fill={getTailwindColorValue('blue-500')}
        />
        <div className="leading-none">{getValue<string>()}</div>
        <div className=" text-slate-400 text-xs">{`(${pluralize(
          'task',
          cell.row.original.tasks.length,
          true
        )})`}</div>
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    size: 116,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 justify-end">
          <Button variant="ghost" size={'icon'}>
            <Plus size={16} color={getTailwindColorValue('slate-950')} />
          </Button>
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
  const table = useReactTable({
    data: MOCK_DATA,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
  });

  return (
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
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{
                    width: cell.column.getSize() || 'auto',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No Projects.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
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
