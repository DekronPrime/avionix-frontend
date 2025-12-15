import { useAirlines } from "@/src/hooks/useAirlines";
import { cn } from "@/src/utils/cn";
import { aircraftSchema } from "@/src/validation/aircraftSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Badge } from "../common/Badge";
import { DropdownField } from "../modal/DropDownField";
import { NumberField } from "../modal/NumberField";
import { TextField } from "../modal/TextInput";

type AircraftFormProps = {
  type: "create" | "edit";
  item: any;
  onSubmit: (data: any) => void;
};

export const AircraftForm: React.FC<AircraftFormProps> = ({
  type,
  item,
  onSubmit,
}: AircraftFormProps) => {
  const methods = useForm({
    resolver: zodResolver(aircraftSchema),
    defaultValues: item,
    mode: "onChange",
  });

  const { airlines } = useAirlines();

  const submit = (data: any) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        id="aircraft-form"
        className="flex flex-col gap-4"
        onSubmit={methods.handleSubmit(submit)}
      >
        <div className="inline-flex w-full items-center gap-4">
          <TextField
            name="model"
            label="Aircraft Model"
            required
            placeholder="Boeing 747"
            className="w-full"
          />
        </div>
        <div className="inline-flex w-full items-center gap-4">
          <NumberField
            name="capacity"
            label="Aircraft Capacity"
            required
            placeholder="50"
            className="w-full"
          />
          <DropdownField
            name="airlineId"
            label="Airline"
            required
            placeholder="Choose an airline from the list below..."
            options={airlines.map((a) => ({
              value: a.id,
              label: a.name,
              badge: a.iataCode,
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
                    variant="iata"
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
                  variant="iata"
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
