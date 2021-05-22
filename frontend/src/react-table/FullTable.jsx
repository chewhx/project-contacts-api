import React, { useState, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { CSVLink } from "react-csv";

const FullTable = ({ data: _data, columns: _columns }) => {
  const [csvData, setCsvData] = useState([]);

  const columns = useMemo(() => _columns, [_columns]);
  const data = useMemo(() => _data.data, [_data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    toggleAllRowsSelected,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const { globalFilter, pageIndex, pageSize, selectedRowIds } = state;

  console.log("selectedFlatRows :>> ", selectedFlatRows);

  const prepareCsvData = () => {
    const csv = [];
    // set header array
    const headers = Object.keys(selectedFlatRows[0].values);
    csv.push(headers);
    // iterate through all select row object and push array of values
    for (let row of selectedFlatRows) {
      csv.push(Object.values(row.values));
    }
    setCsvData(csv);
  };
  return (
    <div className="container">
      <div className="row mb-4">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div
        className="alert alert-secondary w-100"
        style={{
          visibility: `${!selectedFlatRows.length ? `hidden` : `inherit`}`,
        }}
      >
        {`${selectedFlatRows.length} contact(s) selected.`}
        <button
          className="float-right ml-2 btn btn-link"
          style={{ padding: "0" }}
          onClick={() => toggleAllRowsSelected(false)}
        >
          Leave them alone.
        </button>
      </div>
      <div className="row mb-2">
        <div className="pagination">
          <button
            className="btn btn-link"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <i className="bi bi-chevron-double-left"></i>
          </button>
          <button
            className="btn btn-link"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn btn-link"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
          <button
            className="btn btn-link"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <i className="bi bi-chevron-double-right"></i>
          </button>
          <button className="btn">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </button>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle"
            id="displayFieldsDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Display fields
          </button>
          <div
            className="dropdown-menu px-2"
            aria-labelledby="displayFieldsDropdown"
          >
            <div className="custom-control custom-switch dropdown-item">
              <input
                id="select-all"
                className="custom-control-input"
                type="checkbox"
                {...getToggleHideAllColumnsProps()}
              />
              <label className="custom-control-label" htmlFor="select-all">
                Select/Unselect All
              </label>
            </div>
            {allColumns
              .filter(
                (column) => column.id !== "selection" && column.id !== "_id"
              )
              .map((column) => (
                <div
                  key={column.id}
                  className="custom-control custom-switch dropdown-item"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    id={column.id}
                    className="custom-control-input"
                    type="checkbox"
                    {...column.getToggleHiddenProps()}
                  />
                  <label className="custom-control-label" htmlFor={column.id}>
                    {column.Header}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle"
            id="resultsPerPageDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Per Page
          </button>
          <div
            className="dropdown-menu px-2"
            aria-labelledby="resultsPerPageDropdown"
          >
            {[5, 10, 15, 20, 25, 50].map((each, idx) => (
              <button
                key={`per-page-option-${idx}`}
                value={each}
                className="btn btn-link dropdown-item"
                onClick={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {each} {each === pageSize && <i className="bi bi-check"></i>}
              </button>
            ))}
          </div>
        </div>

        <CSVLink
          hidden={!selectedFlatRows.length}
          className="btn btn-link ml-auto"
          data={csvData}
          filename={`contacts-${new Date().toLocaleString()}.csv`}
          asyncOnClick={true}
          onClick={async (e, done) => {
            await prepareCsvData();
            done();
          }}
        >
          {`Download CSV (${selectedFlatRows.length})`}
        </CSVLink>
      </div>

      <div className="table-responsive">
        <table
          {...getTableProps()}
          className={`table bg-white table-borderless table-hover`}
        >
          <thead className="border-bottom">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={column.isSorted ? `font-italic` : null}
                    >
                      {column.render("Header")}
                      <span className="float-right">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="bi bi-caret-up-fill"></i>
                          ) : (
                            <i className="bi bi-caret-down-fill"></i>
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  htmlFor={`row-${row.id}`}
                  className={row.isSelected ? `bg-light` : null}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      <label
                        htmlFor={`row-${row.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        {cell.render("Cell")}
                      </label>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FullTable;
