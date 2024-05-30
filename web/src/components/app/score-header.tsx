'use client';

import { Badge } from '@/components/ui/badge';
import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import { Circle } from 'lucide-react';

export default function ScoreHeader() {
  return (
    <>
      <ScoreSection title="Global Score">
        <Badge variant="default" size="lg">
          65%
        </Badge>
      </ScoreSection>
      <ScoreSection title="Costs">
        <ScoreTable>
          <ScoreLabel label="Score" />
          <ScoreBadgeValue value="65%" />
          <ScoreBestValue value="50%" />
          <ScoreLabel label="Cost" />
          <ScoreValue value="$ 500 000,00" />
          <ScoreBestValue value="$ 400 000,00" />
          <ScoreLabel label="Profit" />
          <ScoreValue value="$ 100 000,00" />
          <ScoreBestValue value="$ 300 000,00" />
        </ScoreTable>
      </ScoreSection>
      <ScoreSection title="Equipments">
        <ScoreTable>
          <ScoreLabel label="Score" />
          <ScoreBadgeValue value="62%" />
          <ScoreBestValue value="87%" />
          <ScoreLabel label="Quantity" />
          <ScoreValue value="12 units" />
          <ScoreBestValue value="8 units" />
          <ScoreLabel label="Hours" />
          <ScoreValue value="240 h" />
          <ScoreBestValue value="160 h" />
        </ScoreTable>
      </ScoreSection>
      <ScoreSection title="Employees">
        <ScoreTable>
          <ScoreLabel label="Score" />
          <ScoreBadgeValue value="82%" />
          <ScoreBestValue value="92%" />
          <ScoreLabel label="Quantity" />
          <ScoreValue value="20 units" />
          <ScoreBestValue value="12 units" />
          <ScoreLabel label="Hours" />
          <ScoreValue value="520 h" />
          <ScoreBestValue value="542 h" />
        </ScoreTable>
      </ScoreSection>
      <ScoreSection title="Time">
        <ScoreTable>
          <ScoreLabel label="Score" />
          <ScoreBadgeValue value="75%" />
          <ScoreBestValue value="84%" />
          <ScoreLabel label="Time" />
          <ScoreValue value="120 days" />
          <ScoreBestValue value="90 days" />
        </ScoreTable>
      </ScoreSection>
    </>
  );
}

function ScoreSection(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start border-r px-4 text-sm gap-1">
      <h3 className="font-semibold mb-1">{props.title}</h3>
      {props.children}
    </div>
  );
}

function ScoreTable(props: { children: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-2 grid-cols-[auto,auto,auto] items-center">
      {props.children}
    </div>
  );
}

function ScoreCircleIndicator() {
  return (
    <Circle
      size={8}
      color={getTailwindColorValue('yellow-500')}
      fill={getTailwindColorValue('yellow-500')}
    />
  );
}

function ScoreBestValue(props: { value: string }) {
  return (
    <div className="flex items-center gap-2">
      <ScoreCircleIndicator />
      <div className="text-sm text-slate-500">{props.value}</div>
    </div>
  );
}

function ScoreLabel(props: { label: string }) {
  return <div className="text-slate-500 pr-8">{props.label}</div>;
}

function ScoreValue(props: { value: string }) {
  return <div className="font-medium">{props.value}</div>;
}

function ScoreBadgeValue(props: { value: string }) {
  return (
    <div>
      <Badge variant="default" size="sm">
        {props.value}
      </Badge>
    </div>
  );
}
