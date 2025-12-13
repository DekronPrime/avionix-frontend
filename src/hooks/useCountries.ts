import { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";
import { countriesApi } from "../lib/api/countries.api";
import { toast } from "sonner";

export function useCountries() {
  const [countries, setCountries] = useState<any[]>([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await countriesApi.getAll();
        setCountries(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load countries");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { countries };
}
