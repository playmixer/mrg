import React from "react";

interface Props {
  title: string
  onChange: any
  readonly?: boolean
  name?: string
  disabled?: boolean
  accept?: string
}

export const InputFile = ({title, onChange, readonly = false, name="file", disabled=false, accept=''}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
    onChange && onChange(e)
  }
  return <div className="mb-3">
    <label className="form-label">{title}</label>
    <input
      type={"file"}
      className="form-control"
      style={{borderRadius: 0}}
      // value={value}
      onChange={handleChange}
      readOnly={readonly}
      name={name}
      disabled={disabled}
      accept={accept}
    />
  </div>
}
