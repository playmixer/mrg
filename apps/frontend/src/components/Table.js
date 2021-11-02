import React from 'react';

const Table = ({columns, data}) => {
  console.log(data)

  return <table className="table">
    <thead>
    <tr>
      {columns && columns.map(column => <th>{column.name}</th>)}
    </tr>
    </thead>
    <tbody>
    {data && data.map((row, ri) => <tr key={`r${ri}`}>
      {Object.keys(row).map((k, i) => <td key={`td${i}`}>{row[k]}</td>)}
    </tr>)}
    </tbody>

  </table>
}

export default Table;
