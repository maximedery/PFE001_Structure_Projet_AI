'use client';

import Gantt from "@/components/app/gantt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTailwindColorValue } from "@/helpers/getTailwindColorValue";
import { Check, Sparkles } from "lucide-react";

export default function AiPlanner() {
  return (
    <Tabs defaultValue="basic" className="flex flex-col">
        <div className="border-b py-2 px-2 flex items-center">
          <TabsList>
            <TabsTrigger value="basic" cyanLabel>Basic</TabsTrigger>
            <TabsTrigger value="advanced" cyanLabel>Advanced</TabsTrigger>
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
              <Badge variant="label" size='lg'>Compare the scenarios according to their priority.</Badge>
              <TabsList className="ml-2">
                <TabsTrigger value="cost">Costs</TabsTrigger>
                <TabsTrigger value="equipment">Equipments</TabsTrigger>
                <TabsTrigger value="employee">Employees</TabsTrigger> 
                <TabsTrigger value="time">Time</TabsTrigger>
                <TabsTrigger value="global">Global</TabsTrigger>
              </TabsList>
              <span className="flex-1" />
              <Button variant="outline" size={'sm'}>
                <Check size={18} color={getTailwindColorValue('cyan-500')} className="mr-2" />
                Save this scenario
              </Button>
            </div>
            <TabsContent value="cost" className="flex pb-2 pl-2">
              <div className="flex flex-col items-start border-r px-2 text-sm">
                <h3 className="font-medium mb-1">Global Score</h3>
                <Badge variant="default" size='lg'>65%</Badge>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="advanced">Advanced</TabsContent>
        <Gantt  />
    </Tabs>
  );
}
