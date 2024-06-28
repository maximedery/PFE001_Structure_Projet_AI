'use client';

import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.svg"
        alt="Tanzim"
        width={32}
        height={32}
        className="h-8 w-auto"
      />
      <div className="mt-px text-center text-xl font-semibold leading-none text-primary">
        Tanzim
      </div>
    </div>
  );
}
