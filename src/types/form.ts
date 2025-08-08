// src/types/form.ts
export type FormField = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  defaultValue: string;
  validation: {
    minLength: number;
    maxLength: number;
    email: boolean;
    password: boolean;
  };
  derived: {
    parentFields: string[];
    formula: string;
  };
};
