import React from 'react';
import Table from 'react-bootstrap/Table';
import { HeaderTableType } from 'types/tableType';
import { useTranslation } from "react-i18next";

const DataTable = ({ headers, data }: { headers: HeaderTableType[]; data: any[] }) => {
  const { t } = useTranslation();

  return (
    <Table responsive>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{t(header.title)}</th>
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