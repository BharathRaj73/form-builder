import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyForms.css";

interface Form {
  id: string;
  name: string;
  fields: { id: string; label: string; type: string }[];
}

const MyForms: React.FC = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    setForms(storedForms);
  }, []);

  const goToPreview = (formId: string) => {
    navigate(`/preview/${formId}`);
  };

  const deleteForm = (formId: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      const updatedForms = forms.filter((form) => form.id !== formId);
      setForms(updatedForms);
      localStorage.setItem("forms", JSON.stringify(updatedForms));
    }
  };

  return (
    <div className="myforms-container">
      <h2 className="myforms-title">My Forms</h2>

      {forms.length === 0 ? (
        <p className="no-forms">No forms created yet.</p>
      ) : (
        <ul className="myforms-list">
          {forms.map((form) => (
            <li key={form.id}>
              <span>{form.name}</span>
              <div>
                <button onClick={() => goToPreview(form.id)}>Preview</button>{" "}
                <button
                  onClick={() => deleteForm(form.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/create")} className="btn-create">
        Create New Form
      </button>
    </div>
  );
};

export default MyForms;
