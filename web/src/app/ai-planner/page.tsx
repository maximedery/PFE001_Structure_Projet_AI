'use client';

import Gantt from "@/components/app/gantt";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTailwindColorValue } from "@/helpers/getTailwindColorValue";

export default function AiPlanner() {
  return (
    <Tabs defaultValue="basic" className="flex flex-col">
        <div className="border-b py-2 px-2">
          <TabsList>
            <TabsTrigger value="basic" cyanLabel>Basic</TabsTrigger>
            <TabsTrigger value="advanced" cyanLabel>Advanced</TabsTrigger>
          </TabsList>
        </div>  
        <TabsContent value="basic">
          <Tabs defaultValue="cost" className="flex flex-col">
            <div className="border-b pb-2 px-2">
              <Badge variant="default" size='lg'>Compare the scenarios according to their priority.</Badge>
              <TabsList className="ml-2">
                <TabsTrigger value="cost">Costs</TabsTrigger>
                <TabsTrigger value="equipment">Equipments</TabsTrigger>
                <TabsTrigger value="employee">Employees</TabsTrigger>
                <TabsTrigger value="time">Time</TabsTrigger>
                <TabsTrigger value="global">Global</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </TabsContent>
        <TabsContent value="advanced">Advanced</TabsContent>
        <Gantt  />
    </Tabs>
  );
}
