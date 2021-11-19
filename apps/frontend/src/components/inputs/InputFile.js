import React from "react";

const InputFile = ({title, value, onChange, readonly = false, name, disabled=false, accept=''}) => {
  const handleChange = (e) => {
    console.log(e.target.name)
    onChange && onChange(e)
  }
  return <div className="mb-3">
    <label className="form-label">{title}</label>
    <input
      type={"file"}
      className="form-control"
      style={{borderRadius: 0}}
      value={value}
      onChange={handleChange}
      readOnly={readonly}
      name={name}
      disabled={disabled}
      accept={accept}
    />
  </div>
}

export default InputFile;
