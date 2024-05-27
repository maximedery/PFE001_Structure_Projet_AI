'use client';

import Gantt from '@/components/app/gantt';
import ScoreHeader from '@/components/app/score-header';
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

export default function AiPlanner() {
  return (
    <Tabs defaultValue="basic" className="flex flex-col">
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
          <Sparkles size={18} color={'white'} className="mr-2" />
          Generate
        </Button>
      </div>
      <TabsContent value="basic">
        <Tabs defaultValue="cost" className="flex flex-col">
          <div className="border-b pb-2 px-2 flex items-center">
            <Badge variant="label" size="lg">
              Compare the scenarios according to their priority.
            </Badge>
            <TabsList className="ml-2">
              <TabsTrigger value="cost">Costs</TabsTrigger>
              <TabsTrigger value="equipment">Equipments</TabsTrigger>
              <TabsTrigger value="employee">Employees</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
            <span className="flex-1" />
            <Button variant="outline" size={'sm'}>
              <Check
                size={18}
                color={getTailwindColorValue('cyan-500')}
                className="mr-2"
              />
              Save this scenario
            </Button>
          </div>
          <TabsContent value="cost" className="flex pb-2">
            <ScoreHeader />
          </TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="advanced">Advanced</TabsContent>
      <div className="border-t text-slate-700 bg-slate-50 text-xs px-2 py-1">
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
          <Settings
            size={18}
            color={getTailwindColorValue('slate-950')}
            className="mr-2"
          />
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
          <ChevronDown
            size={18}
            color={getTailwindColorValue('slate-950')}
            className="ml-2"
          />
        </Button>
      </div>
      <Gantt />
    </Tabs>
  );
}
