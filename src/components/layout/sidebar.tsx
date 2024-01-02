import { PeopleList } from '@/components/people-list';

export const Sidebar = () => {
  return (
    <aside
      id={'people-sideba'}
      className="w-96 hidden lg:block border-r h-[95vh] overflow-y-auto sticky top-0"
    >
      <PeopleList />
    </aside>
  );
};
