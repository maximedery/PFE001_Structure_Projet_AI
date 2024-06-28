'use client';

import { useAtom } from 'jotai';
import { CircleChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';
import { isConnectedAtom } from '@/stores/general';

export default function LandingPage() {
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <div className="flex h-full flex-1 items-center px-16">
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
            onClick={handleConnect}
          >
            Plan my projects
          </Button>
          <Button
            variant="ghost"
            onClick={handleConnect}
            className="rounded-none font-semibold"
          >
            How it works
            <CircleChevronRight
              size={24}
              color={getTailwindColorValue('slate-800')}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
