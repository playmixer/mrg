import React from "react";

interface Props {
  title: string
  value: string
  onChange?: any
  placeholder?: string
  readonly?: boolean
  name: string
  disabled?: boolean
  style?: object
}

export const InputArea = ({title, value, onChange, placeholder = "", readonly = false, name, disabled = false, style}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e)
  }

  return <div className="mb-3">
    {title && <label className="form-label">{title}</label>}
    <div>
      <textarea
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

// export default InputArea;
