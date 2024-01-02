import { Loader } from 'lucide-react';

export const LoadingCell = () => {
  return (
    <div className="p-4 text-center">
      <p className="text-text-light font-bold flex items-center justify-center gap-2 text-lg">
        <Loader className="w-6 h-6 animate-spin" /> Loading
      </p>
    </div>
  );
};
