import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { HeaderTableType } from "types/tableType";
import { useTranslation } from "react-i18next";
import "./DataTable.scss";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const DataTable = ({
  headers,
  data,
}: {
  headers: HeaderTableType[];
  data: any[];
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
  Object.values(item).some((val: any) =>
    val.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);

  const numPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFirst = () => setCurrentPage(1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < numPages && setCurrentPage(currentPage + 1);
  const handleLast = () => setCurrentPage(numPages);

  const handleSelect = (
    num: string | null,
    event: React.SyntheticEvent<unknown>,
  ) => {
    if (num !== null) {
      setItemsPerPage(Number(num));
      setCurrentPage(1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };


  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <Form.Control
        type="text"
        placeholder={(t('table_search_placeholder'))}
        value={searchTerm}
        onChange={handleSearch}
      />
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} style={{ width: header.width }}>
                {t(header.title)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, valueIndex) => (
                <td key={rowIndex + "-" + valueIndex}>{item[header.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="table-footer">
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle id="dropdown-basic">
            {t('items_per_table')}
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item eventKey="5">5</Dropdown.Item>
            <Dropdown.Item eventKey="10">10</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Pagination className="pagination">
          <Pagination.First onClick={handleFirst} />
          <Pagination.Prev onClick={handlePrev} />
          {[...Array(numPages)].map((e, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handleClick(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNext} />
          <Pagination.Last onClick={handleLast} />
        </Pagination>
      </div>
    </>
  );
  
};

export default DataTable;
