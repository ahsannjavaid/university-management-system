import React from "react";

export default function Switch({ label, onChange, value }) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckChecked"
        onChange={onChange}
        value={value}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        {label}
      </label>
    </div>
  );
}
