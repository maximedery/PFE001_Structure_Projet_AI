'use client';

import Gantt from "@/components/app/gantt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTailwindColorValue } from "@/helpers/getTailwindColorValue";

export default function AiPlanner() {
  return (
    <Tabs defaultValue="basic" className="flex flex-col">
        <div className="border-b py-2 px-2">
          <TabsList>
            <TabsTrigger value="basic" color={'cyan-500'}>Basic</TabsTrigger>
            <TabsTrigger value="advanced" color={'cyan-500'}>Advanced</TabsTrigger>
          </TabsList>
        </div>  
        <TabsContent value="basic">
          <div className="border-b py-2 px-2">
            Basic
          </div>
        </TabsContent>
        <TabsContent value="advanced">Advanced</TabsContent>
        <Gantt  />
    </Tabs>
  );
}
