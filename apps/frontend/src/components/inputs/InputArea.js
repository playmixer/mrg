import React from "react";

const InputArea = ({title, value, onChange, placeholder = "", readonly = false, type = "text", name, disabled = false, style}) => {
  const handleChange = (e) => {
    onChange && onChange(e)
  }

  return <div className="mb-3">
    {title && <label className="form-label">{title}</label>}
    <div>
      <textarea
        type={type}
        className="form-control"
        style={{borderRadius: 0, ...style}}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readonly}
        name={name}
        disabled={disabled}
      />
    </div>

  </div>
}

export default InputArea;
