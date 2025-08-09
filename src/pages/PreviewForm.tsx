import React from "react";
import { useParams, Link } from "react-router-dom";
import "./PreviewForm.css"; 

interface FormField {
  id: string;
  label: string;
  type: string;
}

interface FormData {
  id: string;
  name: string;
  fields: FormField[];
}

const PreviewForm: React.FC = () => {
  const { id } = useParams();
  const forms: FormData[] = JSON.parse(localStorage.getItem("forms") || "[]");
  const foundForm = forms.find((form) => form.id === id);

  const savedDataRaw = localStorage.getItem(`formData_${id}`);
  const savedData: Record<string, any> = savedDataRaw
    ? JSON.parse(savedDataRaw)
    : {};

  if (!foundForm) {
    return (
      <div className="preview-container">
        <h2 className="preview-title">Form not found</h2>
        <p>
          The form you are trying to preview doesn’t exist.{" "}
          <Link to="/myforms" className="back-link">
            Go back
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <h2 className="preview-title">Preview: {foundForm.name}</h2>
      <form>
        {foundForm.fields.map((field) => (
          <div key={field.id} className="preview-field">
            <label>
              {field.label}:{" "}
              {field.type === "text" ||
              field.type === "number" ||
              field.type === "date" ? (
                <input
                  type={field.type}
                  readOnly
                  value={savedData[field.id] ?? ""}
                  placeholder=""
                />
              ) : (
                <span>{savedData[field.id] ?? "No data"}</span>
              )}
            </label>
          </div>
        ))}
      </form>
      <Link to="/myforms" className="back-link">
        Back to My Forms
      </Link>
    </div>
  );
};

export default PreviewForm;
