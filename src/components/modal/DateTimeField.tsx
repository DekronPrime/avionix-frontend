import { cn } from "@/src/utils/cn";
import { useFormContext } from "react-hook-form";

type DateTimeFieldProps = {
  name: string;
  label: string;
  className?: string;
};

export const DateTimeField: React.FC<DateTimeFieldProps> = ({
  name,
  label,
  className,
}: DateTimeFieldProps) => {
  const { register, formState } = useFormContext();

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-sm font-semibold font-poppins text-black">
        {label}
      </label>

      <input
        type="datetime-local"
        {...register(name)}
        className="w-full text-[16px] font-ptSerif font-bold bg-light rounded-lg border-l-[3px] focus:border-dark border-foreground p-2.5 pl-3 text-black focus:outline-none transition-all"
      />

      {formState.errors[name] && (
        <p className="mt-1 text-xs font-semibold text-red-700">
          {formState.errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
