export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  password?: boolean;
}

export interface DerivedFieldConfig {
  parentFields: string[];
  formula: string;
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "checkbox";
  required?: boolean;
  defaultValue?: any;
  validation?: FieldValidation;

  derived?: DerivedFieldConfig;
}

export interface FormStructure {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}
