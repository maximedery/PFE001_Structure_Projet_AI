'use client';

import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import { ChevronDown, Ellipsis, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import React from 'react';

const MOCK_DATA = [
  { id: '1', name: 'Carpenter', quantity: 15 },
  { id: '2', name: 'Electrician', quantity: 10 },
  { id: '3', name: 'Plumber', quantity: 5 },
  { id: '4', name: 'Painter', quantity: 20 },
];

export default function OccupationTable() {
  return (
    <div className="grid grid-cols-[250px,auto]">
      <div className="bg-slate-50 border-y border-l border-slate-200 p-2 text-sm rounded-tl-md">
        Occupation
      </div>
      <div className="bg-slate-50 border-y border-r border-slate-200 p-2 text-sm rounded-tr-md">
        Quantity
      </div>
      {MOCK_DATA.map((data, index) => (
        <React.Fragment key={data.id}>
          <OccupationDropdown
            name={data.name}
            isLast={MOCK_DATA.length === index + 1}
          />
          <OccupationQuantityInput
            value={data.quantity}
            isLast={MOCK_DATA.length === index + 1}
          />
        </React.Fragment>
      ))}
      <div className="mt-2">
        <Button variant="ghost" size={'sm'}>
          <Plus size={18} color={getTailwindColorValue('slate-950')} />
          Add an Occupation
        </Button>
      </div>
    </div>
  );
}

function OccupationDropdown(props: { name: string; isLast?: boolean }) {
  return (
    <div
      className={cn(
        'border-b border-l border-slate-200 p-2',
        props.isLast ? 'rounded-bl-md' : ''
      )}
    >
      <Button
        variant="outline_black"
        size={'sm'}
        className="w-full justify-start"
      >
        {props.name}
        <ChevronDown size={18} color={getTailwindColorValue('slate-300')} />
      </Button>
    </div>
  );
}

function OccupationQuantityInput(props: { value: number; isLast?: boolean }) {
  return (
    <div
      className={cn(
        'border-b border-r border-slate-200 p-2 flex',
        props.isLast ? 'rounded-br-md' : ''
      )}
    >
      <Input
        className="w-[100px] text-end"
        value={props.value}
        onChange={() => {
          // TODO: Implement Input
        }}
      />
      <span className="flex-1" />
      <Button variant="ghost" size={'sm'}>
        <Ellipsis size={18} color={getTailwindColorValue('slate-950')} />
      </Button>
    </div>
  );
}
