import React from "react";

const InputText = ({title, value, onChange, placeholder = "", readonly = false, type = "text", name}) => {
  const handleChange = (e) => {
    console.log(e.target.name)
    onChange && onChange(e)
  }
  return <div className="mb-3">
    <label className="form-label">{title}</label>
    <input
      type={type}
      className="form-control"
      style={{borderRadius: 0}}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      readOnly={readonly}
      name={name}
    />
  </div>
}

export default InputText;
