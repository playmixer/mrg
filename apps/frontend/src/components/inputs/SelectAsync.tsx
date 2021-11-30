import React from 'react';
import AsyncSelect from "react-select/async";

interface Props {
  onInputChange?: any
  onChange: any
  loadOptions: any
  title: string
  className?: string
}

export const SelectAsync = ({onInputChange, onChange, loadOptions, title, className}: Props) => {


  return <div className={className}>
    {title && <label className={"form-label"}>{title}</label>}
    <AsyncSelect
      styles={{
        control: (styles) => ({...styles, borderRadius: 0}),
        option: (styles) => ({...styles, borderRadius: 0, marginTop: 0})
      }}
      onInputChange={onInputChange}
      loadOptions={loadOptions}
      onChange={onChange}
    />
  </div>
}
