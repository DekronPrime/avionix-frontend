import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLoader } from "../context/LoaderContext";
import { airlinesApi } from "../lib/api/airlines.api";

export function useAirlines() {
  const [airlines, setAirlines] = useState<any[]>([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await airlinesApi.getAll();
        setAirlines(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load airlines");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { airlines };
}
