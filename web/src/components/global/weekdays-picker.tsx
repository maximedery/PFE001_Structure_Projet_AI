'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const options = [
  { value: 'sunday', label: 'S' },
  { value: 'monday', label: 'M' },
  { value: 'tuesday', label: 'T' },
  { value: 'wednesday', label: 'W' },
  { value: 'thursday', label: 'T' },
  { value: 'friday', label: 'F' },
  { value: 'saturday', label: 'S' },
];

interface Props {
  value: string[];
  onChange: (days: string[]) => void;
}

export default function WeekdaysPicker(props: Props) {
  const { value, onChange } = props;

  return (
    <ToggleGroup
      type="multiple"
      value={value}
      onValueChange={onChange}
      className="flex gap-1.5"
    >
      {options.map((day) => (
        <ToggleGroupItem
          key={day.value}
          value={day.value}
          size="sm"
          variant="blue_outline"
          className="size-8 rounded-full text-sm font-semibold"
        >
          {day.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
