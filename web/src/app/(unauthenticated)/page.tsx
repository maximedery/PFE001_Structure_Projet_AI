'use client';

import { CircleChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-1 items-center gap-8 px-16 pb-16 pt-4">
      {/* Left Content */}
      <div className="flex w-[550px] flex-col">
        <div className="text-6xl font-semibold tracking-tight">
          Plan months in <br />
          <div className="relative mt-2 inline-block">
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent underline ">
              minutes.
            </span>
            <div className="absolute inset-x-0 bottom-[-8px] h-[5px] bg-gradient-to-r from-cyan-300 to-cyan-500"></div>
          </div>
        </div>
        <div className="mt-10 text-justify font-medium text-gray-800">
          Tanzim is an advanced AI platform that revolutionizes construction
          project planning and management. Using cutting-edge technology, Tanzim
          streamlines the entire project lifecycle, ensuring efficiency,
          precision, and cost-effectiveness from start to finish.
        </div>
        <div className="mt-10 flex gap-2">
          <Button
            variant="default"
            className="rounded-none"
            onClick={() => router.push('/login')}
          >
            Plan my projects
          </Button>
          <Button
            variant="ghost"
            className="rounded-none font-semibold"
            onClick={() => router.push('/login')}
          >
            How it works
            <CircleChevronRight
              size={24}
              color={getTailwindColorValue('slate-800')}
            />
          </Button>
        </div>
      </div>
      {/* Right Content */}
      <div className="flex flex-1 items-center justify-center gap-5">
        <div className="mb-16">
          <Image
            src="/screenshot-1.png"
            alt="screenshot-1"
            width={240}
            height={480}
            style={{ boxShadow: '0px 8px 64px 0px rgba(143, 143, 143, 0.16)' }}
          />
        </div>
        <div>
          <Image
            src="/screenshot-2.png"
            alt="screenshot-2"
            width={240}
            height={480}
            style={{ boxShadow: '0px 8px 64px 0px rgba(143, 143, 143, 0.16)' }}
          />
        </div>
        <div className="mt-16">
          <Image
            src="/screenshot-3.png"
            alt="screenshot-3"
            width={240}
            height={480}
            style={{ boxShadow: '0px 8px 64px 0px rgba(143, 143, 143, 0.16)' }}
          />
        </div>
      </div>
    </div>
  );
}
