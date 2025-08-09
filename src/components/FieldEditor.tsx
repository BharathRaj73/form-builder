import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FormField } from "../types/form";
import { useFormBuilder } from "../context/FormBuilderContext";

interface FieldEditorProps {
  field: FormField;
}

const FieldEditor: React.FC<FieldEditorProps> = ({ field }) => {
  const { updateField, removeField } = useFormBuilder();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 4,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Label"
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          fullWidth
        />
        <TextField
          label="Field Type"
          select
          value={field.type}
          onChange={(e) =>
            updateField(field.id, { type: e.target.value as FormField["type"] })
          }
          fullWidth
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="password">Password</MenuItem>
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={field.required}
              onChange={(e) =>
                updateField(field.id, { required: e.target.checked })
              }
            />
          }
          label="Required"
        />
        <IconButton color="error" onClick={() => removeField(field.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <TextField
        label="Default Value"
        value={field.defaultValue || ""}
        onChange={(e) =>
          updateField(field.id, { defaultValue: e.target.value })
        }
        fullWidth
      />
    </Box>
  );
};

export default FieldEditor;
