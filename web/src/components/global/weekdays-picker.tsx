'use client';

import { cn } from '@/lib/utils';

const MOCK_DATA = [
  { value: 'sunday', label: 'S', selected: false },
  { value: 'monday', label: 'M', selected: true },
  { value: 'tuesday', label: 'T', selected: true },
  { value: 'wednesday', label: 'W', selected: true },
  { value: 'thursday', label: 'T', selected: true },
  { value: 'friday', label: 'F', selected: true },
  { value: 'saturday', label: 'S', selected: false },
];

export default function WeekdaysPicker() {
  return (
    <div className="flex gap-1.5">
      {MOCK_DATA.map((day) => (
        <div
          key={day.value}
          className={cn(
            'h-8 w-8 border flex items-center justify-center rounded-full text-sm font-semibold cursor-pointer',
            day.selected
              ? 'bg-cyan-50 border-cyan-500 hover:bg-cyan-100 hover:border-cyan-600'
              : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300',
          )}
        >
          {day.label}
        </div>
      ))}
    </div>
  );
}
