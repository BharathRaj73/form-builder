import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./CreateFormPage.css";

interface FormField {
  id: string;
  label: string;
  type: string;
}

const CreateFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState("text");

  const addField = () => {
    if (!newLabel.trim()) return;
    setFields([...fields, { id: uuidv4(), label: newLabel, type: newType }]);
    setNewLabel("");
    setNewType("text");
  };

  const saveForm = () => {
    if (!formName.trim() || fields.length === 0) {
      return alert("Form must have a name and at least one field");
    }

    const newForm = {
      id: uuidv4(),
      name: formName,
      fields,
    };

    const storedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    storedForms.push(newForm);
    localStorage.setItem("forms", JSON.stringify(storedForms));

    navigate("/myforms");
  };

  return (
    <div className="form-container">
      <h2 className="title">Create Form</h2>

      <input
        type="text"
        className="input"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
      />

      <h3 className="subtitle">Add Field</h3>
      <div className="field-row">
        <input
          type="text"
          className="input"
          placeholder="Field Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <select
          className="select"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
        <button className="btn btn-add" onClick={addField}>
          Add
        </button>
      </div>

      <h3 className="subtitle">Preview Fields</h3>
      <ul className="preview-list">
        {fields.map((field) => (
          <li key={field.id} className="preview-item">
            <span className="field-label">{field.label}</span>
            <span className="field-type">({field.type})</span>
          </li>
        ))}
      </ul>

      <button className="btn btn-save" onClick={saveForm}>
        Save Form
      </button>
    </div>
  );
};

export default CreateFormPage;
