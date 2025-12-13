import { useCountries } from "@/src/hooks/useCountries";
import { cn } from "@/src/utils/cn";
import { airportSchema } from "@/src/validation/airportSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Badge } from "../common/Badge";
import { DropdownField } from "../modal/DropDownField";
import { TextField } from "../modal/TextInput";

type AirportFormProps = {
  type: "create" | "edit";
  item: any;
  onSubmit: (data: any) => void;
};

export const AirportForm: React.FC<AirportFormProps> = ({
  type,
  item,
  onSubmit,
}: AirportFormProps) => {
  const methods = useForm({
    resolver: zodResolver(airportSchema),
    defaultValues: item,
    mode: "onChange",
  });

  const { countries } = useCountries();

  const submit = (data: any) => {
    console.log("FORM DATA (validated):", data);
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        id="airport-form"
        className="flex flex-col gap-4"
        onSubmit={methods.handleSubmit(submit)}
      >
        <div className="inline-flex w-full items-center gap-4">
          <TextField
            name="name"
            label="Airport name"
            required
            placeholder="Ternopil International Airport"
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

        <div className="inline-flex w-full items-center gap-4">
          <TextField
            name="iataCode"
            label="IATA Code"
            required
            placeholder="TRN"
            className="w-full"
          />
          <TextField
            name="city"
            label="City"
            required
            placeholder="Ternopil"
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
