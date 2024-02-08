import React from 'react'

export default function InputField({ label, type, value, onChange, required }) {
  return (
    <>
      {label ? <label className="form-label">{label}</label> : null}
      <input
        className="form-control"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  )
}
