// src/pages/FormPreview.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormBuilder } from "../context/FormBuilderContext";

const FormPreview: React.FC = () => {
  const { fields } = useFormBuilder();
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // Initialize form values only once when fields change
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    fields.forEach((field) => {
      initialValues[field.id] =
        field.type === "checkbox"
          ? field.defaultValue ?? false
          : field.defaultValue ?? "";
    });
    setFormValues(initialValues);
  }, [fields]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Form Preview
      </Typography>

      {fields.length === 0 ? (
        <Typography>
          No fields to preview. Go to create page and add fields.
        </Typography>
      ) : (
        fields.map((field) => {
          const value = formValues[field.id] ?? "";

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
                  value={
                    typeof value === "string" || typeof value === "number"
                      ? value
                      : ""
                  }
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
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
                  value={typeof value === "string" ? value : ""}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  sx={{ mb: 2 }}
                />
              );

            case "checkbox":
              return (
                <FormControlLabel
                  key={field.id}
                  control={
                    <Checkbox
                      checked={!!value}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          [field.id]: e.target.checked,
                        }))
                      }
                    />
                  }
                  label={field.label}
                  sx={{ mb: 2 }}
                />
              );

            default:
              return null;
          }
        })
      )}

      {/* ✅ Debug: show live form data */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Form Data (Live Preview)</Typography>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </Box>
    </Box>
  );
};

export default FormPreview;
