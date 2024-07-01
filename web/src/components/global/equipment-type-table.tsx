'use client';

import React from 'react';

import { ResourceTable } from './resource-table';

const MOCK_DATA_EQUIPMENT = [
  { id: '1', name: 'Hammer', quantity: 30 },
  { id: '2', name: 'Screwdriver', quantity: 25 },
  { id: '3', name: 'Wrench', quantity: 10 },
  { id: '4', name: 'Saw', quantity: 15 },
];

export default function EquipmentTypeTable(props: { className?: string }) {
  return (
    <ResourceTable
      data={MOCK_DATA_EQUIPMENT}
      columns={['Equipment Type', 'Quantity']}
      addButtonText="Add Equipment Type"
      className={props.className}
    />
  );
}
