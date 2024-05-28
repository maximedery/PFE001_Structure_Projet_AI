'use client';

import { getTailwindColorValue } from '@/helpers/getTailwindColorValue';
import { COLUMN_WIDTH } from '@/helpers/global';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  scales,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';

const NUMBER_OF_DAYS = 30;

let workload: EmployeeWorkload[] = initWorkload();

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Workload() {
  const chartWidth = NUMBER_OF_DAYS * COLUMN_WIDTH; // Each tick is 80px wide

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[165px] border-r border-slate-200 shrink-0">
        {workload.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center h-8 px-2 border-b border-slate-200 gap-2"
          >
            <ChevronRight
              size={18}
              color={getTailwindColorValue('slate-950')}
            />
            <div className="text-xs whitespace-nowrap">{employee.name}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full overflow-auto">
        {workload.map((employee) => {
          const data = employee.workloads.map((workload) => workload.hours);

          return (
            <div className="h-8" style={{ width: `${chartWidth}px` }}>
              <Bar
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: { padding: { top: 5 } },
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                    datalabels: {
                      font: {
                        size: 9,
                      },
                      anchor: 'end',
                      align: 'top',
                      offset: -6,
                      color: getTailwindColorValue('slate-400'),
                      display: function (context) {
                        console.log('🚀 ~ context:', context);
                        const dataIndex = context.dataIndex;
                        const dataValue =
                          (context.dataset.data[dataIndex] as number) || 0;
                        return dataValue > 0;
                      },
                      formatter: function (value, context) {
                        return value + 'h';
                      },
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                      beginAtZero: true,
                    },
                    y: { display: false, beginAtZero: true },
                  },
                }}
                data={{
                  labels: data,
                  datasets: [
                    {
                      label: 'Workload Hours',
                      data: data,
                      backgroundColor: getTailwindColorValue('violet-100'),
                      borderColor: getTailwindColorValue('violet-400'),
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface WorkloadEntry {
  date: Date;
  hours: number;
}

interface EmployeeWorkload {
  id: string;
  name: string;
  workloads: WorkloadEntry[];
}

function getRandomHours() {
  return Math.floor(Math.random() * 9); // Random hours between 0 and 8
}

export function initWorkload(): EmployeeWorkload[] {
  const currentDate = dayjs();
  const firstDay = currentDate.startOf('month').toDate();

  const employeeNames = [
    'Field Employee 1',
    'Field Employee 2',
    'Field Employee 3',
    'Field Employee 4',
    'Field Employee 5',
    'Field Employee 6',
  ];

  const employeeWorkloads: EmployeeWorkload[] = employeeNames.map(
    (name, index) => {
      const workloads: WorkloadEntry[] = [];
      for (let i = 0; i < NUMBER_OF_DAYS; i++) {
        const date = dayjs(firstDay).add(i, 'day').toDate();
        const hours = getRandomHours();
        workloads.push({ date, hours });
      }
      return {
        id: (index + 1).toString(),
        name,
        workloads,
      };
    }
  );

  return employeeWorkloads;
}
