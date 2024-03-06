// SimpleTable.js

import React, { useState } from "react";
import "./Home.css";

const SimpleTable = ({ data, columns }) => {
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map((column) => column.key)
  );
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns((prevVisibleColumns) => {
      if (prevVisibleColumns.includes(columnKey)) {
        return prevVisibleColumns.filter((key) => key !== columnKey);
      } else {
        return [...prevVisibleColumns, columnKey];
      }
    });
  };

  const handleToggleColumnModal = () => {
    setShowColumnModal((prevState) => !prevState);
  };

  const handleColumnCheckboxChange = (columnKey) => {
    toggleColumnVisibility(columnKey);
  };

  const handleSort = (columnKey) => {
    setSortColumn(columnKey);
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const handleSearch = () => {
    // Handle the search logic here
    // For simplicity, let's filter the data based on the "name" field
    const filteredData = data
      .filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortColumn) {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return 0;
        }
      });

    return filteredData;
  };

  return (
    <div>
      <button onClick={handleToggleColumnModal}>Toggle Columns</button>

      {showColumnModal && (
        <div className="column-modal">
          <h3>Toggle Columns</h3>
          {columns.map((column) => (
            <div key={column.key}>
              <label>
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column.key)}
                  onChange={() => handleColumnCheckboxChange(column.key)}
                />
                {column.label}
              </label>
            </div>
          ))}
          <button onClick={handleToggleColumnModal}>Close</button>
        </div>
      )}

      <div style={{ marginBottom: "10px" }}>
        <label>
          Search by Name:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <button onClick={() => handleSearch()}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map(
              (column) =>
                visibleColumns.includes(column.key) && (
                  <th key={column.key} onClick={() => handleSort(column.key)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {column.label}
                      {sortColumn === column.key && (
                        <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                      )}
                    </div>
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {handleSearch().map((row, index) => (
            <tr key={index}>
              {columns.map(
                (column) =>
                  visibleColumns.includes(column.key) && (
                    <td key={column.key}>{row[column.key]}</td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
