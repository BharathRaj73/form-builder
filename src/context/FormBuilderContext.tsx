// src/context/FormBuilderContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { FormField } from "../types/form";

type FormBuilderContextType = {
  fields: FormField[];
  addField: (field: FormField) => void;
  updateField: (id: string, updatedField: Partial<FormField>) => void;
  removeField: (id: string) => void;
  setFields: (fields: FormField[]) => void;
};

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(
  undefined
);

export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = (field: FormField) => {
    setFields((prev) => [...prev, field]);
  };

  const updateField = (id: string, updatedField: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <FormBuilderContext.Provider
      value={{ fields, addField, updateField, removeField, setFields }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return context;
};
