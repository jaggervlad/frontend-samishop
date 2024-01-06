'use client';

import { PeopleList } from '@/components/people-list';
import { ScrollArea } from '../shared/scroll-area';

export const Sidebar = () => {
  return (
    <aside className="w-96 hidden lg:block border-r h-[95vh] overflow-y-auto sticky">
      <ScrollArea className="h-full">
        <PeopleList />
      </ScrollArea>
    </aside>
  );
};
