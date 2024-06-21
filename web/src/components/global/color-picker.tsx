'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Paintbrush } from 'lucide-react';

export function ColorPicker({
  color,
  setColor,
  className,
}: {
  color: string;
  setColor: (background: string) => void;
  className?: string;
}) {
  const solids = [
    '#3b82f6', // blue-500
    '#f97316', // orange-500
    '#84cc16', // lime-500
    '#eab308', // yellow-500
    '#f43f5e', // rose-500
    '#8b5cf6', // violet-500
    '#10b981', // emerald-500
    '#ec4899', // pink-500
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline_black'}
          size={'sm'}
          className={cn(
            'w-[220px] justify-start text-left font-normal py-px',
            !color && 'text-muted-foreground',
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {color ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background: color }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {color ? color : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-wrap gap-1 mt-0">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
              onClick={() => setColor(s)}
            />
          ))}
        </div>
        <Input
          id="custom"
          value={color}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setColor(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
