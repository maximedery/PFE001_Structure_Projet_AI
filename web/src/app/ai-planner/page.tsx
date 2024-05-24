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
              <Badge variant="default" size='lg'>Compare the scenarios according to their priority.</Badge>
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
          </Tabs>
        </TabsContent>
        <TabsContent value="advanced">Advanced</TabsContent>
        <Gantt  />
    </Tabs>
  );
}
