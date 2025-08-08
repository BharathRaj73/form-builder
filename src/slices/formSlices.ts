import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormField } from "../types/form";

interface FormState {
  fields: FormField[];
}

const initialState: FormState = {
  fields: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField(state, action: PayloadAction<FormField>) {
      state.fields.push(action.payload);
    },
    updateField(state, action: PayloadAction<FormField>) {
      const index = state.fields.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.fields[index] = action.payload;
      }
    },
  },
});

export const { addField, updateField } = formSlice.actions;
export default formSlice.reducer;
