'use client';

import React from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogContentArea,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  itemName: string | null;
  onDelete: () => void;
}

export function DeleteDialog(props: Props) {
  const { isOpen, onOpenChange, itemName, onDelete } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <DialogContentArea>
          <span>
            Are you sure you want to delete{' '}
            <span className="font-semibold">{itemName || 'Untitled'}</span> ?
          </span>
        </DialogContentArea>
        <DialogFooter>
          <Button
            variant="ghost"
            size={'sm'}
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size={'sm'}
            type="button"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
