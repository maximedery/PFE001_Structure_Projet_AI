'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogContentArea,
  DialogContentRow,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ProjectDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[800px] ">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-3">
              <div className="text-slate-500">Project</div>
              <div className="text-slate-500">/</div>
              <div>{'Condo 2000'}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogContentArea>
          <DialogContentRow>
            <Label>Name</Label>
            <Input
              id="name"
              value="Condo 2000"
              className="col-span-2"
              autoFocus
            />
          </DialogContentRow>
        </DialogContentArea>
        <DialogFooter>
          <Button variant="ghost_destructive" size={'sm'}>
            Delete this Project
          </Button>
          <span className="flex-1" />
          <Button variant="ghost" size={'sm'}>
            Cancel
          </Button>
          <Button variant="black" size={'sm'}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
