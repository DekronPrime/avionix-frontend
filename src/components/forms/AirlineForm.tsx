import { useCountries } from "@/src/hooks/useCountries";
import { airlineSchema } from "@/src/validation/airlineSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { TextField } from "../modal/TextInput";
import { DropdownField } from "../modal/DropDownField";
import { cn } from "@/src/utils/cn";
import { Badge } from "../common/Badge";

type AirlineFormProps = {
  type: "create" | "edit";
  item: any;
  onSubmit: (data: any) => void;
};

export const AirlineForm: React.FC<AirlineFormProps> = ({
  type,
  item,
  onSubmit,
}: AirlineFormProps) => {
  const methods = useForm({
    resolver: zodResolver(airlineSchema),
    defaultValues: item,
    mode: "onChange",
  });

  const { countries } = useCountries();

  const submit = (data: any) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        id="airline-form"
        className="flex flex-col gap-4"
        onSubmit={methods.handleSubmit(submit)}
      >
        <div className="inline-flex w-full items-center gap-4">
          <TextField
            name="name"
            label="Airline name"
            required
            placeholder="Avionix Airlines"
            className="w-full"
          />
        </div>

        <div className="inline-flex w-full items-center gap-4">
          <TextField
            name="iataCode"
            label="IATA Code"
            required
            placeholder="AX"
            className="w-full"
          />
          <DropdownField
            name="countryId"
            label="Country"
            required
            placeholder="Choose a country from the list below..."
            options={countries.map((c) => ({
              value: c.id,
              label: c.name,
              badge: c.isoCode,
            }))}
            renderOption={(opt, active) => (
              <div
                className={cn(
                  "px-3 py-2 flex items-center gap-2 hover:bg-foreground",
                  active && "bg-foreground"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Badge
                    variant="iso"
                    textColor="text-white"
                    bgColor="bg-white/20"
                  >
                    {opt?.badge}
                  </Badge>
                  {opt?.label}
                </span>
              </div>
            )}
            renderValue={(opt) => (
              <span className="inline-flex items-center gap-2">
                <Badge
                  variant="iso"
                  textColor="text-black"
                  bgColor="bg-black/20"
                >
                  {opt?.badge}
                </Badge>
                {opt?.label}
              </span>
            )}
            className="w-full"
          />
        </div>
        <p className="text-xs font-inter italic text-black">
          Fields marked with * are required.
        </p>
      </form>
    </FormProvider>
  );
};
