'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface Props {
  size: 'default' | 'lg';
  onClick?: () => void;
}

export function Logo(props: Props) {
  const { size = 'default', onClick } = props;

  const sizeMap = {
    default: {
      image: 32,
      font: 'text-xl',
    },
    lg: {
      image: 40,
      font: 'text-3xl',
    },
  };

  return (
    <div
      className={cn('flex items-center', !!onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      <Image
        src="/logo.svg"
        alt="Tanzim"
        width={sizeMap[size].image}
        height={sizeMap[size].image}
      />
      <div
        className={cn(
          'mt-px text-center font-semibold leading-none text-primary',
          sizeMap[size].font,
        )}
      >
        Tanzim
      </div>
    </div>
  );
}
