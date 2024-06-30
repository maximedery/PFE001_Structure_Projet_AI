'use client';

import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
  value: string | null;
  onChange: (date: string | null) => void;
}

export function DatePicker(props: Props) {
  const [month, setMonth] = React.useState<Date | undefined>(
    props.value ? dayjs(props.value).toDate() : undefined,
  );

  React.useEffect(() => {
    if (props.value) {
      setMonth(dayjs(props.value).toDate());
    }
  }, [props.value]);

  const handleOnSelect = (date?: Date) => {
    props.onChange(dayjs(date).toISOString());
  };

  const handleClearDate = () => {
    props.onChange(null);
  };

  return (
    <Popover
      onOpenChange={() => {
        if (props.value) {
          setMonth(dayjs(props.value).toDate());
        } else {
          setMonth(undefined);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={'outline_black'}
          size="sm"
          className={cn(
            'w-[200px] justify-between text-left',
            !props.value && 'text-muted-foreground',
          )}
        >
          {props.value ? (
            dayjs(props.value).format('LL')
          ) : (
            <span className="font-normal">Pick a date</span>
          )}
          <CalendarDays className="mr-2 size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={props.value ? dayjs(props.value).toDate() : undefined}
          onSelect={handleOnSelect}
          month={month}
          onMonthChange={setMonth}
          initialFocus
        />
        {props.value && (
          <div className="flex px-2 pb-4">
            <Button
              variant="outline_black"
              size="sm"
              onClick={handleClearDate}
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
