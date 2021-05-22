import React, { useMemo } from "react";
import { FIELDS } from "../utils/constants";
import { useTable } from "react-table";
import { FieldArray } from "formik";

const Table = ({ data: _data, columns: _columns, isPreviousData, formik }) => {
  const { values, handleChange, handleSubmit, setFieldValue } = formik;
  const columns = useMemo(() => _columns, [_columns]);
  const data = useMemo(() => _data.data, [_data]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  console.log(values);
  return (
    <>
      <table
        {...getTableProps()}
        className={`table bg-white table-borderless table-hover`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>{col.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="text-center border-top">
            <td colSpan="12">
              {Array.from(Array(_data.pages).keys()).map((each, idx) => (
                <button
                  key={`page-btn-${idx}`}
                  className={`btn btn-sm mx-1 font-weight-bold ${
                    values.page === each + 1
                      ? "btn-outline-secondary"
                      : "btn-link"
                  }`}
                  onClick={() => setFieldValue("page", each + 1)}
                  disabled={values.page === each + 1}
                >
                  {each + 1}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <td colSpan="12" className="border-top">
              <div className="row flex align-items-center justify-content-center">
                <button
                  type="button"
                  className="btn btn-light btn-sm mx-3"
                  onClick={() =>
                    setFieldValue("page", Math.max(values.page - 1, 1))
                  }
                  disabled={!_data.pagination.prev}
                >
                  <i className="bi bi-caret-left-fill"></i>
                </button>
                <input
                  hidden
                  id="page"
                  name="page"
                  value={values.page}
                  className="form-control font-weight-bold"
                  style={{
                    width: "50px",
                    minWidth: "50px",
                    maxWidth: "50px",
                  }}
                  onChange={handleChange}
                />
                <span className="font-weight-bold">
                  Page {values.page} / {_data.pages}
                </span>
                <button
                  type="button"
                  className="btn btn-light btn-sm mx-3"
                  onClick={() => {
                    setFieldValue(
                      "page",
                      Math.min(values.page + 1, _data.pages)
                    );
                  }}
                  disabled={isPreviousData || !_data.pagination.next}
                >
                  <i className="bi bi-caret-right-fill"></i>
                </button>
              </div>
            </td>
          </tr>
          {/* Formik */}
          <tr>
            <td colSpan="12" className="my-4">
              <div className="row">
                <div className="col-md-4 form-group">
                  <label htmlFor="sort" className="form-label">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option
                      value={`name.firstName`}
                    >{`First Name (ascending)`}</option>
                    <option
                      value={`-name.firstName`}
                    >{`First Name (descending)`}</option>
                  </select>
                </div>
                <div className="col-md-4 form-group">
                  <label htmlFor="limit" className="form-label">
                    Results per page:
                  </label>
                  <select
                    id="limit"
                    name="limit"
                    value={values.limit}
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value={values.limit}>
                      {values.limit}
                      {` (current)`}
                    </option>
                    {["5", "10", "25", "50"]
                      .filter((each) => each !== values.limit)
                      .map((each, idx) => (
                        <option key={`limit-option-${idx}`} value={each}>
                          {each}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="select" className="form-label">
                    Display fields:
                  </label>
                  <div>
                    {FIELDS.map((each, idx) => (
                      <FieldCheckBox
                        key={`display-fields-option-${idx}`}
                        id={`select-${idx}`}
                        // name={`select`}
                        label={each[0]}
                        value={each[1].join(".")}
                        defaultChecked
                        onChange={(e) => {
                          e.target.checked
                            ? setFieldValue("select", [
                                ...values.select,
                                e.target.value,
                              ])
                            : setFieldValue(
                                "select",
                                values.select.filter(
                                  (each) => each !== e.target.value
                                )
                              );
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Apply changes
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

const FieldCheckBox = ({ id, label, onChange, value, defaultChecked }) => {
  return (
    <>
      <div
        className="custom-control custom-switch custom-control-inline"
        style={{ zIndex: "0" }}
      >
        <input
          id={id}
          type="checkbox"
          className="custom-control-input"
          defaultChecked={defaultChecked}
          value={value}
          onChange={onChange}
        />
        <label className="custom-control-label" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Table;
