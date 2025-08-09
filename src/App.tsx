import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateFormPage from "./pages/createFormPage";
import MyForms from "./pages/MyForms";
import PreviewForm from "./pages/PreviewForm";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/create" element={<CreateFormPage />} />
      <Route path="/myforms" element={<MyForms />} />
      <Route path="/preview/:id" element={<PreviewForm />} />
      <Route path="/" element={<CreateFormPage />} />
    </Routes>
  );
};

export default App;
