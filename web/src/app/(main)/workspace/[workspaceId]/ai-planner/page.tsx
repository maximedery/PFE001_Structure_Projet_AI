'use client';

import {
  Check,
  ChevronDown,
  FoldVertical,
  Search,
  Settings,
  Sparkles,
  UnfoldVertical,
} from 'lucide-react';

import Gantt from '@/components/global/gantt';
import ScoreHeader from '@/components/global/score-header';
import Workload from '@/components/global/workload';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTailwindColorValue } from '@/helpers/get-tailwind-color-value';

export default function AiPlannerPage() {
  return (
    <Tabs defaultValue="basic" className="flex h-full flex-col">
      <div className="flex items-center border-b p-2">
        <TabsList>
          <TabsTrigger value="basic" cyanLabel>
            Basic
          </TabsTrigger>
          <TabsTrigger value="advanced" cyanLabel>
            Advanced
          </TabsTrigger>
        </TabsList>
        <span className="flex-1" />
        <Button variant="default" size={'sm'}>
          <Sparkles size={18} color={'white'} />
          Generate
        </Button>
      </div>
      <TabsContent value="basic" className="border-b">
        <Tabs defaultValue="cost" className="flex flex-col">
          <div className="flex items-center gap-2 border-b px-2 pb-2">
            <Badge variant="label" size="lg">
              Compare the scenarios according to their priority.
            </Badge>
            <TabsList>
              <TabsTrigger value="cost">Costs</TabsTrigger>
              <TabsTrigger value="equipment">Equipments</TabsTrigger>
              <TabsTrigger value="employee">Employees</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
            <span className="flex-1" />
            <Button variant="outline" size={'sm'}>
              <Check size={18} color={getTailwindColorValue('cyan-500')} />
              Save this scenario
            </Button>
          </div>
          <TabsContent value="cost" className="flex pb-2">
            <ScoreHeader />
          </TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="advanced">Advanced</TabsContent>
      <div className="flex h-full flex-col overflow-auto">
        <div className="border-b bg-slate-50 px-2 py-1 text-xs text-slate-700">
          Timeline
        </div>
        <div className="flex gap-2 p-2">
          <Input
            startIcon={Search}
            placeholder="Search"
            className="w-[250px]"
            onChange={() => {
              // TODO: Implement search
            }}
          />
          <Button variant="outline_black" size={'sm'}>
            <Settings size={18} color={getTailwindColorValue('slate-950')} />
            Settings
          </Button>
          <Button variant="outline_black" size={'sm'}>
            <UnfoldVertical
              size={18}
              color={getTailwindColorValue('slate-950')}
            />
          </Button>
          <Button variant="outline_black" size={'sm'}>
            <FoldVertical
              size={18}
              color={getTailwindColorValue('slate-950')}
            />
          </Button>
          <Button variant="outline_black" size={'sm'}>
            Year / Month
            <ChevronDown size={18} color={getTailwindColorValue('slate-950')} />
          </Button>
        </div>
        <Gantt />
        <div className="border-y bg-slate-50 px-2 py-1 text-xs text-slate-700">
          Workload
        </div>
        <Tabs defaultValue="employee" className="flex flex-col overflow-hidden">
          <div className="border-b border-slate-200 p-2">
            <TabsList>
              <TabsTrigger value="employee">Employees</TabsTrigger>
              <TabsTrigger value="equipment">Equipments</TabsTrigger>
              <TabsTrigger value="cost">Cost</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="employee" className="m-0">
            <Workload />
          </TabsContent>
          <TabsContent value="equipment" className="m-0">
            equipment
          </TabsContent>
          <TabsContent value="cost" className="m-0">
            cost
          </TabsContent>
        </Tabs>
      </div>
    </Tabs>
  );
}
