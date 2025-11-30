import { Dispatch, SetStateAction } from "react";

export type LoaderContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
