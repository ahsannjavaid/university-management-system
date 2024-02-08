import React from "react";

export default function SelectField({ label, options, value, onChange, required }) {
  return (
    <>
      {label ? <label className="form-label">{label}</label> : null}
      <select
        className="form-select"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select</option>
        {options?.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
    </>
  );
}
