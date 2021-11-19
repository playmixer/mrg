import React from "react";
import InputText from "./InputText";

const RadioGroup = ({data, name, onChange, checked}) => {

  return <div>
    {data.map((v, i) => {
      return <div className="form-check" key={i}>
        <input
          className="form-check-input"
          type="radio" name={`${name}`}
          id={`${name}${i}`}
          onChange={onChange}
          value={v.value}
          checked={checked === v.value}
        />
        <label className="form-check-label" htmlFor={`${name}${i}`}>
          {v.title}
        </label>
      </div>
    })}
  </div>
}

export default RadioGroup;
