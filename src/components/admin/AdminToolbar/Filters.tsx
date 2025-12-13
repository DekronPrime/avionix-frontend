type FiltersProps = {
  children?: React.ReactNode;
};

export const Filters: React.FC<FiltersProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-[300px] gap-3">
      {children}
    </div>
  );
};
