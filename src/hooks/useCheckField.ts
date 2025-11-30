import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { checkField } from "../lib/api/checkField";
import { CheckState } from "../types/checkState";

export function useCheckField(
  field: "username" | "email",
  value: string | undefined,
  minLength: number = 3
) {
  const [status, setStatus] = useState<CheckState>(null);
  const debounced = useDebounce(value, 500);

  useEffect(() => {
    if (!debounced || debounced.length < minLength) {
      setStatus(null);
      return;
    }

    let active = true;
    const check = async () => {
      setStatus("checking");
      const result = await checkField(field, debounced);
      if (!active) return;

      setStatus(result ? "taken" : "free");
    };

    check();

    return () => {
      active = false;
    };
  }, [debounced, field, minLength]);

  return status;
}
