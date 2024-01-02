interface SectionHeaderProps {
  title: string;
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <header className="px-4 pt-8 pb-2">
      <h3 className="text-lg font-bold text-text">{title}</h3>
    </header>
  );
};
