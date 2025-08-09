import React, { createContext, useContext, useState } from "react";
import type { FormField } from "../types/form";

interface FormBuilderContextProps {
  fields: FormField[]; // ✅ Added this
  addField: (field: FormField) => void;
  updateField: (id: string, updatedField: Partial<FormField>) => void;
  removeField: (id: string) => void;
}

const FormBuilderContext = createContext<FormBuilderContextProps | undefined>(
  undefined
);

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = (field: FormField) => {
    setFields((prev) => [...prev, field]);
  };

  const updateField = (id: string, updatedField: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedField } : f))
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FormBuilderContext.Provider
      value={{ fields, addField, updateField, removeField }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context)
    throw new Error("useFormBuilder must be used within FormBuilderProvider");
  return context;
};
