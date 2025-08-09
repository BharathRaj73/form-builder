import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import type { FormField, FormStructure } from "../types/form";

const FormPreview: React.FC = () => {
  const [form, setForm] = useState<FormStructure | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const raw = localStorage.getItem("selectedForm");
    if (raw) {
      try {
        const parsed: FormStructure = JSON.parse(raw);
        setForm(parsed);

        const initialValues: Record<string, any> = {};
        parsed.fields.forEach((field: FormField) => {
          initialValues[field.id] =
            field.type === "checkbox"
              ? field.defaultValue ?? false
              : field.defaultValue ?? "";
        });
        setFormValues(initialValues);
      } catch (err) {
        console.error("Failed to load selectedForm:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!form) return;

    const updatedValues = { ...formValues };

    form.fields.forEach((field) => {
      if (
        field.derived &&
        field.derived.parentFields.length > 0 &&
        field.derived.formula
      ) {
        try {
          const parents = field.derived.parentFields.reduce((acc, pid) => {
            acc[pid] = formValues[pid] ?? "";
            return acc;
          }, {} as Record<string, any>);

          const computeFn = new Function(
            "values",
            `return ${field.derived!.formula};`
          );
          updatedValues[field.id] = computeFn(parents);
        } catch (err) {
          console.warn(`Failed to compute derived field ${field.id}:`, err);
        }
      }
    });

    setFormValues(updatedValues);
  }, [formValues, form]);

  const validateField = (field: FormField, value: any): string => {
    if (field.required && !value) return "This field is required.";
    if (
      field.validation?.minLength &&
      value.length < field.validation.minLength
    )
      return `Minimum length is ${field.validation.minLength}.`;
    if (
      field.validation?.maxLength &&
      value.length > field.validation.maxLength
    )
      return `Maximum length is ${field.validation.maxLength}.`;
    if (field.validation?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email address.";
    }
    if (field.validation?.password) {
      const pass = String(value);
      const hasNumber = /\d/.test(pass);
      if (pass.length < 8 || !hasNumber) {
        return "Password must be at least 8 characters and include a number.";
      }
    }
    return "";
  };

  const handleChange = (field: FormField, value: any) => {
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field.id]: err }));
    setFormValues((prev) => ({ ...prev, [field.id]: value }));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {form?.title || "Form Preview"}
      </Typography>

      {!form || form.fields.length === 0 ? (
        <Typography>No form selected or fields missing.</Typography>
      ) : (
        form.fields.map((field) => {
          const value = formValues[field.id] ?? "";
          const error = errors[field.id] ?? "";

          // Derived field → read-only
          if (field.derived) {
            return (
              <TextField
                key={field.id}
                fullWidth
                label={field.label}
                value={value}
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            );
          }

          switch (field.type) {
            case "text":
            case "number":
            case "date":
              return (
                <TextField
                  key={field.id}
                  fullWidth
                  label={field.label}
                  type={field.type}
                  required={field.required}
                  value={value}
                  onChange={(e) => handleChange(field, e.target.value)}
                  error={!!error}
                  helperText={error}
                  sx={{ mb: 2 }}
                />
              );

            case "textarea":
              return (
                <TextField
                  key={field.id}
                  fullWidth
                  label={field.label}
                  multiline
                  rows={4}
                  required={field.required}
                  value={value}
                  onChange={(e) => handleChange(field, e.target.value)}
                  error={!!error}
                  helperText={error}
                  sx={{ mb: 2 }}
                />
              );

            case "checkbox":
              return (
                <Box key={field.id} sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!value}
                        onChange={(e) => handleChange(field, e.target.checked)}
                      />
                    }
                    label={field.label}
                  />
                  {error && <FormHelperText error>{error}</FormHelperText>}
                </Box>
              );

            default:
              return null;
          }
        })
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Form Data (Live Preview)</Typography>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </Box>
    </Box>
  );
};

export default FormPreview;
