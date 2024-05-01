import React, { useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { HeaderTableType } from "types/tableType";
import { useTranslation } from "react-i18next";
import "./DataTable.scss";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { ComplaintType } from "types/complaintType";
import { Row } from "react-bootstrap";

const DataTable = ({
  headers,
  data,
  filterButtonText,
  handleFilterButtonClick,
  onMouseOverRow,
  onRowClick,
}: {
  headers: HeaderTableType[];
  data: any[];
  filterButtonText: string;
  handleFilterButtonClick: () => void;
  onMouseOverRow?: (row: ComplaintType) => void;
  onRowClick?: (row: ComplaintType) => void;
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending

  const filteredData = data.filter((item) =>
    Object.values(item).some((val: any) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection ? 1 : -1;
    }
    return 0;
  });

  const numPages = Math.ceil(sortedData.length / itemsPerPage);

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

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection(field === sortField ? !sortDirection : true);
  };

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = (item: any) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onMouseOverRow && onMouseOverRow(item);
    }, 700);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const isLogged = sessionStorage.getItem("isLoggedIn");

  return (
    <>
      <Form.Group
        controlId="formTitle"
        className="d-flex align-items-center my-3"
      >
        <Row style={{ width: "100%" }}>
          <div className="col-4" style={{ display: "flex", alignItems: "end" }}>
            <Form.Label className="label_search">{t("search")}:</Form.Label>
            <Form.Control
              className="col-4"
              type="text"
              placeholder={t("table_search_placeholder")}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {isLogged && (
            <div className="col-8" style={{ textAlign: "right" }}>
              <button
                className="btn btn-primary"
                onClick={handleFilterButtonClick}
              >
                {filterButtonText}
              </button>
            </div>
          )}
        </Row>
      </Form.Group>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                style={{ width: header.width }}
                onClick={() => handleSort(header.key)}
              >
                {t(header.title)}
                {sortField === header.key && (sortDirection ? " 🔽" : " 🔼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onMouseOver={() => onMouseOverRow && handleMouseOver(item)}
              onMouseLeave={() => onMouseOverRow && handleMouseLeave()}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {headers.map((header, valueIndex) => (
                <td key={rowIndex + "-" + valueIndex}>
                  {header.type !== "date"
                    ? item[header.key]
                    : new Date(item[header.key]).toLocaleDateString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="table-footer">
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle id="dropdown-basic">
            {t("items_per_table", { elements: itemsPerPage })}
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
