import React from "react";

export default ({children, schema, type="button", onClick, style, className = ""}) => {
  let schemaStyle = '';
  switch (schema) {
    case 'primary':
      schemaStyle ='btn-outline-primary'
      break
    case 'main-primary':
      schemaStyle ='btn-primary'
      break
    case 'light':
      schemaStyle = 'btn-outline-light'
      break
    case 'danger':
      schemaStyle = 'btn-danger'
      break
    default:
      schemaStyle = 'btn-outline-primary'
  }

  return <button
    type={type}
    className={`btn ${schemaStyle} ` + className}
    style={{borderRadius: 0, ...style}}
    onClick={onClick}
  >
    {children}
  </button>
}
