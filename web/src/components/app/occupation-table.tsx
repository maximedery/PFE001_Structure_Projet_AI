'use client';

import React from 'react';
import { ResourceTable } from './resource-table';

const MOCK_DATA_OCCUPATION = [
  { id: '1', name: 'Carpenter', quantity: 15 },
  { id: '2', name: 'Electrician', quantity: 10 },
  { id: '3', name: 'Plumber', quantity: 5 },
  { id: '4', name: 'Painter', quantity: 20 },
];

export default function OccupationTable(props: { className?: string }) {
  return (
    <ResourceTable
      data={MOCK_DATA_OCCUPATION}
      columns={['Occupation', 'Quantity']}
      addButtonText="Add an Occupation"
      className={props.className}
    />
  );
}
