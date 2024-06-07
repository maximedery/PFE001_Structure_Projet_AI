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
  Ellipsis,
  Plus,
  Square,
} from 'lucide-react';
import pluralize from 'pluralize';
import { cn } from '@/lib/utils';

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
            ) : null}
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
            <Button variant="ghost" size={'icon'}>
              <Plus size={16} color={getTailwindColorValue('slate-950')} />
            </Button>
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
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data: MOCK_DATA,
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

type Row = ProjectRow | TaskRow;
interface ProjectRow {
  type: 'project';
  id: string;
  name: string;
  code: string;
  subRows: Row[];
}

interface TaskRow {
  type: 'task';
  id: string;
  name: string;
  code: string;
  duration: number | null;
  start: string | null;
  end: string | null;
}

const MOCK_DATA: Row[] = [
  {
    id: '1',
    type: 'project',
    name: 'Project 1',
    code: '1',
    subRows: [
      {
        id: '1',
        type: 'task',
        name: 'Task 1',
        code: '1-1',
        duration: 2,
        start: '2022-01-01',
        end: '2022-01-03',
      },
      {
        id: '2',
        type: 'task',
        name: 'Task 2',
        code: '1-2',
        duration: 3,
        start: '2022-01-04',
        end: '2022-01-06',
      },
      {
        id: '3',
        type: 'task',
        name: 'Task 3',
        code: '1-3',
        duration: 1,
        start: '2022-01-07',
        end: '2022-01-08',
      },
    ],
  },
  {
    id: '2',
    type: 'project',
    name: 'Project 2',
    code: '2',
    subRows: [
      {
        id: '1',
        type: 'task',
        name: 'Task 1',
        code: '2-1',
        duration: 2,
        start: '2022-01-01',
        end: '2022-01-03',
      },
      {
        id: '2',
        type: 'task',
        name: 'Task 2',
        code: '2-2',
        duration: 3,
        start: '2022-01-04',
        end: '2022-01-06',
      },
      {
        id: '3',
        type: 'task',
        name: 'Task 3',
        code: '2-3',
        duration: 1,
        start: '2022-01-07',
        end: '2022-01-08',
      },
    ],
  },
  {
    id: '3',
    type: 'project',
    name: 'Project 3',
    code: '3',
    subRows: [
      {
        id: '1',
        type: 'task',
        name: 'Task 1',
        code: '3-1',
        duration: 2,
        start: '2022-01-01',
        end: '2022-01-03',
      },
      {
        id: '2',
        type: 'task',
        name: 'Task 2',
        code: '3-2',
        duration: 3,
        start: '2022-01-04',
        end: '2022-01-06',
      },
      {
        id: '3',
        type: 'task',
        name: 'Task 3',
        code: '3-3',
        duration: 1,
        start: '2022-01-07',
        end: '2022-01-08',
      },
    ],
  },
  {
    id: '4',
    type: 'project',
    name: 'Project 4',
    code: '4',
    subRows: [
      {
        id: '1',
        type: 'task',
        name: 'Task 1',
        code: '4-1',
        duration: 2,
        start: '2022-01-01',
        end: '2022-01-03',
      },
      {
        id: '2',
        type: 'task',
        name: 'Task 2',
        code: '4-2',
        duration: 3,
        start: '2022-01-04',
        end: '2022-01-06',
      },
    ],
  },
  {
    id: '5',
    type: 'project',
    name: 'Project 5',
    code: '5',
    subRows: [],
  },
];
