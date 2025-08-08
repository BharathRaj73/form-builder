// src/pages/CreateFormPage.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useFormBuilder } from "../context/FormBuilderContext";
import FieldEditor from "../components/FieldEditor";
import type { FormField } from "../types/form";

const CreateFormPage: React.FC = () => {
  const { fields, addField } = useFormBuilder();

  const handleAddField = () => {
    const newField: FormField = {
      id: nanoid(),
      label: "Untitled Field",
      type: "text",
      required: false,
      defaultValue: "",
      validation: {
        minLength: 0,
        maxLength: 100,
        email: false,
        password: false,
      },
      derived: {
        parentFields: [],
        formula: "",
      },
    };

    addField(newField);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Form
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddField}
        sx={{ mb: 3 }}
      >
        ➕ Add Field
      </Button>

      {fields.length === 0 ? (
        <Typography variant="body1">
          No fields added yet. Click "Add Field" to begin.
        </Typography>
      ) : (
        fields.map((field) => <FieldEditor key={field.id} field={field} />)
      )}
    </Box>
  );
};

export default CreateFormPage;
