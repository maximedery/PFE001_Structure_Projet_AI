'use client';

import Gantt from '@/components/app/gantt';
import ScoreHeader from '@/components/app/score-header';
import Workload from '@/components/app/workload';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import {
  Check,
  Sparkles,
  Search,
  Settings,
  UnfoldVertical,
  FoldVertical,
  ChevronDown,
} from 'lucide-react';

export default function AiPlannerPage() {
  return (
    <Tabs defaultValue="basic" className="flex flex-col h-full">
      <div className="border-b py-2 px-2 flex items-center">
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
      <TabsContent value="basic">
        <Tabs defaultValue="cost" className="flex flex-col">
          <div className="border-b pb-2 px-2 flex items-center gap-2">
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
      <div className="border-y text-slate-700 bg-slate-50 text-xs px-2 py-1">
        Timeline
      </div>
      <div className="flex p-2 gap-2">
        <div className="w-[250px]">
          <Input
            startIcon={Search}
            placeholder="Search"
            className="w-[250px]"
          />
        </div>
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
          <FoldVertical size={18} color={getTailwindColorValue('slate-950')} />
        </Button>
        <Button variant="outline_black" size={'sm'}>
          Year / Month
          <ChevronDown size={18} color={getTailwindColorValue('slate-950')} />
        </Button>
      </div>
      <Gantt />
      <div className="border-y text-slate-700 bg-slate-50 text-xs px-2 py-1">
        Workload
      </div>
      <Tabs defaultValue="employee" className="flex flex-col overflow-hidden">
        <div className="p-2 border-b border-slate-200">
          <TabsList>
            <TabsTrigger value="employee">Employees</TabsTrigger>
            <TabsTrigger value="equipment">Equipments</TabsTrigger>
            <TabsTrigger value="cost">Cost</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="employee"
          className="m-0 overflow-y-auto overflow-x-hidden"
        >
          <Workload />
        </TabsContent>
        <TabsContent value="equipment" className="m-0 overflow-auto">
          equipment
        </TabsContent>
        <TabsContent value="cost" className="m-0 overflow-auto">
          cost
        </TabsContent>
      </Tabs>
    </Tabs>
  );
}
