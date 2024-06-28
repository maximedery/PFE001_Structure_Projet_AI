'use client';

import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center">
      <Image src="/logo.svg" alt="Tanzim" width={40} height={40} />
      <div className="mt-px text-center text-3xl font-semibold leading-none text-primary">
        Tanzim
      </div>
    </div>
  );
}
