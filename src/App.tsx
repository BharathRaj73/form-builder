// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateForm from "./pages/createFormPage"; // Correct relative import
import FormPreview from "./pages/FormPreview";

const App: React.FC = () => {
  return (
    <Routes>
      {/* ✅ Redirect root to /create */}
      <Route path="/" element={<Navigate to="/create" replace />} />
      <Route path="/create" element={<CreateForm />} />
      <Route path="/preview" element={<FormPreview />} />

      {/* Optional: catch-all route for unmatched paths */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
