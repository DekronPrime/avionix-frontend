import { cn } from "@/src/utils/cn";
import { useFormContext } from "react-hook-form";

type TextFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  required,
  placeholder,
  className,
}: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={cn(`flex flex-col gap-1`, className)}>
      <label className="text-sm font-semibold font-poppins text-black">
        {label}
        {required && "*"}
      </label>
      <input
        {...register(name)}
        placeholder={placeholder}
        className="w-full text-[16px] font-ptSerif font-bold bg-light rounded-lg border-l-[3px] focus:border-dark border-foreground p-2.5 pl-3 text-black placeholder:text-black/50 focus:outline-none transition-all"
      />
      <div className="min-h-[16px]">
        {errors[name] && (
          <p className="text-xs font-semibold font-inter text-left text-red-700">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
