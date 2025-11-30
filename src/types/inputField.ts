import { CheckState } from "./checkState";

export type InputFieldType = {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  tooltip?: string;
  error?: string | undefined;
  note?: string;
  noteStatus?: CheckState;
} & React.InputHTMLAttributes<HTMLInputElement>;
