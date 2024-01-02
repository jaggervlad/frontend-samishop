import { Ref, forwardRef } from 'react';

interface DataCellProps {
  title: string;
  label?: string;
}

export const DataCell = forwardRef(
  ({ title, label }: DataCellProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <div className="flex items-center justify-between w-full py-4 pl-4 pr-4">
          <h2 className="text-lg font-bold leading-6 text-text-light">
            {title}
          </h2>
          {label && (
            <div className="flex items-end text-lg font-bold capitalize text-text">
              {label}
            </div>
          )}
        </div>
        <div className="ml-4 text-lg border-b" />
      </div>
    );
  }
);

DataCell.displayName = 'DataCell';
