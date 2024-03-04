import React from 'react';
import Table from 'react-bootstrap/Table';
import { HeaderTableType } from 'types/tableType';

const DataTable = ({ headers, data }: { headers: HeaderTableType[]; data: any[] }) => {
  console.log(JSON.stringify(data[0]))
    return (
    <Table responsive>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
         {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, valueIndex) => (
            <td key={rowIndex + '-' + valueIndex}>{item[header.key]}</td>
            ))}
          </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default DataTable;