'use client';

import { ChevronDown, Ellipsis, Plus } from 'lucide-react';
import React from 'react';

import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function TableHeader({ columns }: { columns: string[] }) {
  return (
    <>
      {columns.map((column, index) => (
        <div
          key={index}
          className={cn(
            'bg-slate-50 border-y border-slate-200 p-2 text-sm',
            index === 0 ? 'border-l rounded-tl-md' : '',
            index === columns.length - 1 ? 'border-r rounded-tr-md' : '',
          )}
        >
          {column}
        </div>
      ))}
    </>
  );
}

export function TableRow({
  data,
  isLast,
}: {
  data: { name: string; quantity: number };
  isLast: boolean;
}) {
  return (
    <>
      <TableCellDropdown name={data.name} isLast={isLast} />
      <TableCellQuantityInput value={data.quantity} isLast={isLast} />
    </>
  );
}

export function TableCellDropdown({
  name,
  isLast,
}: {
  name: string;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        'border-b border-l border-slate-200 p-2',
        isLast ? 'rounded-bl-md' : '',
      )}
    >
      <Button
        variant="outline_black"
        size={'sm'}
        className="w-full justify-start"
      >
        {name}
        <span className="flex-1" />
        <ChevronDown size={18} color={getTailwindColorValue('slate-300')} />
      </Button>
    </div>
  );
}

export function TableCellQuantityInput({
  value,
  isLast,
}: {
  value: number;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        'border-b border-r border-slate-200 p-2 flex',
        isLast ? 'rounded-br-md' : '',
      )}
    >
      <Input
        className="w-[100px]"
        inputClassName="text-end"
        value={value}
        onChange={() => {
          // TODO: Implement Input
        }}
      />
      <span className="flex-1" />
      <Button variant="ghost" size={'sm'} className="ml-2">
        <Ellipsis size={18} color={getTailwindColorValue('slate-950')} />
      </Button>
    </div>
  );
}

export function AddButton({ text }: { text: string }) {
  return (
    <div className="mt-2">
      <Button variant="ghost" size={'sm'}>
        <Plus size={18} color={getTailwindColorValue('slate-950')} />
        {text}
      </Button>
    </div>
  );
}

export function ResourceTable({
  data,
  columns,
  addButtonText,
  className,
}: {
  data: any[];
  columns: string[];
  addButtonText: string;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-[250px,auto]', className)}>
      <TableHeader columns={columns} />
      {data.map((item, index) => (
        <TableRow
          key={item.id}
          data={item}
          isLast={data.length === index + 1}
        />
      ))}
      <AddButton text={addButtonText} />
    </div>
  );
}
