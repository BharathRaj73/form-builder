import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { FormField } from "../types/form";

interface FormBuilderState {
  fields: FormField[];
  formName: string;
}

const initialState: FormBuilderState = {
  fields: [],
  formName: "",
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.formName = action.payload;
    },
    addField: (state, action: PayloadAction<FormField>) => {
      state.fields.push(action.payload);
    },
    updateField: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<FormField> }>
    ) => {
      const { id, changes } = action.payload;
      const index = state.fields.findIndex((field) => field.id === id);
      if (index !== -1) {
        state.fields[index] = { ...state.fields[index], ...changes };
      }
    },

    deleteField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
    },
    reorderFields: (state, action: PayloadAction<FormField[]>) => {
      state.fields = action.payload;
    },
    resetForm: (state) => {
      state.fields = [];
      state.formName = "";
    },
  },
});

export const {
  setFormName,
  addField,
  updateField,
  deleteField,
  reorderFields,
  resetForm,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
