'use client';

import * as React from 'react';
import { CalendarDays } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import dayjs from 'dayjs';

interface Props {
  value: string | null;
  onChange: (date: string | null) => void;
}

export function DatePicker(props: Props) {
  const handleOnSelect = (date?: Date) => {
    props.onChange(dayjs(date).toISOString());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline_black'}
          size="sm"
          className={cn(
            'w-[200px] justify-between text-left',
            !props.value && 'text-muted-foreground'
          )}
        >
          {props.value ? (
            dayjs(props.value).format('LL')
          ) : (
            <span className="font-normal">Pick a date</span>
          )}
          <CalendarDays className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.value ? dayjs(props.value).toDate() : undefined}
          onSelect={handleOnSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
