import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/userApi";
import "../styles/form.css";
import "../styles/app.css";

const initial = { name: "", age: "", city: "", state: "", pincode: "" };

export default function AddUser({ showToast }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const validators = useMemo(() => ({
    name: (v) => {
      const s = v.trim();
      if (!s) return "Name is required";
      if (s.length < 2) return "Name must be at least 2 characters";
      if (s.length > 100) return "Name must be at most 100 characters";
      return "";
    },
    age: (v) => {
      if (v === "" || v === null || v === undefined) return "Age is required";
      const n = Number(v);
      if (!Number.isInteger(n)) return "Age must be an integer";
      if (n < 0) return "Age must be between 0 and 120";
      if (n > 120) return "Age must be between 0 and 120";
      return "";
    },
    city: (v) => (!v.trim() ? "City is required" : ""),
    state: (v) => (!v.trim() ? "State is required" : ""),
    pincode: (v) => {
      const s = v.trim();
      if (!s) return "Pincode is required";
      if (s.length < 4) return "Pincode must be at least 4 characters";
      if (s.length > 10) return "Pincode must be at most 10 characters";
      return "";
    },
  }), []);

  function validateAll(nextForm) {
    const nextErrors = {};
    Object.keys(validators).forEach((k) => {
      const msg = validators[k](nextForm[k]);
      if (msg) nextErrors[k] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onChange(e) {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);

    // inline validation (field-level)
    if (errors[name]) {
      const msg = validators[name](value);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const ok = validateAll(form);
    if (!ok) return;

    try {
      setSaving(true);
      const payload = {
        name: form.name.trim(),
        age: Number(form.age),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      };
      await createUser(payload);

      showToast("User created successfully!");
      navigate("/list");
    } catch (err) {
      showToast(err.message || "Failed to create user", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container page">
      <h1 className="title">Add User</h1>

      <div className="card">
        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label>Name</label>
            <input name="name" value={form.name} onChange={onChange} />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="field">
            <label>Age</label>
            <input name="age" value={form.age} onChange={onChange} inputMode="numeric" />
            {errors.age && <div className="field-error">{errors.age}</div>}
          </div>

          <div className="field">
            <label>City</label>
            <input name="city" value={form.city} onChange={onChange} />
            {errors.city && <div className="field-error">{errors.city}</div>}
          </div>

          <div className="field">
            <label>State</label>
            <input name="state" value={form.state} onChange={onChange} />
            {errors.state && <div className="field-error">{errors.state}</div>}
          </div>

          <div className="field">
            <label>Pincode</label>
            <input name="pincode" value={form.pincode} onChange={onChange} />
            {errors.pincode && <div className="field-error">{errors.pincode}</div>}
          </div>

          <button className="btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}