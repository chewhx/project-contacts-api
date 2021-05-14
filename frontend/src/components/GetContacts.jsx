import React, { useState } from "react";
import { useQuery } from "react-query";
import getNestedObject from "../utils/getNestedObject";
import ReactModal from "react-modal";
import PutContact from "../components/PutContact";
import { GlobalContext } from "../context";
import Spinner from "../components/Spinner";

const fields = [
  ["Salutation", ["salutation"]],
  ["First Name", ["name", "firstName"]],
  ["Last Name", ["name", "lastName"]],
  ["Alias", ["name", "alias"]],
  ["Organisation", ["organisation"]],
  ["Position", ["position"]],
  ["Telephone", ["contact", "telephone"]],
  ["Mobile", ["contact", "mobile"]],
  ["Email", ["contact", "email"]],
];

const GetContacts = () => {
  const { setSelectedContact, showModal, setShowModal } =
    React.useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("name.firstName");
  const [select, setSelect] = useState(fields.map((each) => each[1].join(".")));

  let limitURLquery = `limit=${limit}`;
  let pageURLquery = `page=${page}`;
  let sortURLquery = `sort=${sort}`;
  let selectURLquery = select.length >= 1 ? `&select=${String(select)}` : ``;

  const URL = `https://project-contacts-api.vercel.app/api/v1/contacts?${sortURLquery}&${limitURLquery}&${pageURLquery}${selectURLquery}`;

  const fetchContacts = async () => {
    const res = await fetch(URL);
    return res.json();
  };

  const { status, data, isPreviousData, refetch, isFetching } = useQuery(
    ["contacts", page, limit, sort],
    fetchContacts,
    {
      keepPreviousData: true,
    }
  );

  ReactModal.setAppElement("#root");

  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    "Error fetching data"
  ) : (
    <>
      {/* ================ Modal ================== */}
      <ReactModal
        isOpen={showModal}
        style={{
          overlay: {
            backgroundColor: "var(--light)",
            opacity: "75%",
            zIndex: "2200px",
          },
          content: {
            position: "fixed",
            marginTop: "30px",
            zIndex: "2300px",
            border: "none",
          },
        }}
        overlayElement={(props, contentElement) => {
          return (
            <>
              <div {...props} onClick={() => setShowModal(false)}></div>
              {contentElement}
            </>
          );
        }}
      >
        <button
          type="button"
          className="btn close sticky-top"
          onClick={() => setShowModal(false)}
        >
          <span>&times;</span>
        </button>
        <PutContact id={"6093e1550635fed8b099e746"} />
      </ReactModal>

      {/* ================ Pagination ================== */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Pagination query</h5>
          <p>
            <code>{`?page={num}`}</code>
          </p>
          <p>
            Returns the page of the results. The number of pages are determined
            by the <code>limit</code> query set below.
          </p>
          <button
            className="page-item btn mr-2 btn-outline-primary"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!data.pagination.prev}
          >
            Previous
          </button>
          {Array.from(Array(data.pages).keys()).map((each, idx) => (
            <button
              key={`page-btn-${idx}`}
              className={`page-item btn mr-2 ${
                page === each + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setPage(each + 1)}
              disabled={page === each + 1}
            >
              {each + 1}
            </button>
          ))}
          <button
            className="page-item btn btn-outline-primary"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isPreviousData || !data.pagination.next}
          >
            Next
          </button>
        </div>
      </div>

      {/* ================ Table ================== */}
      <div className="table-responsive">
        <table
          className={`table bg-white table-borderless ${
            !isFetching && `table-hover`
          }`}
        >
          <thead>
            <th className="text-center" colSpan="10">
              <span className="ml-4">
                Page {page} / {data.pages}
              </span>
            </th>
          </thead>
          <thead>
            <tr>
              {fields.map((each, idx) => (
                <th key={`get-table-header-${idx}`} scope="col">
                  {each[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((contact, idx) => (
              <ContactRow
                key={`contact-${idx}`}
                contact={contact}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (!isFetching) {
                    setSelectedContact(contact._id);
                    setShowModal(true);
                  }
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================ Per page ================== */}
      <div className="card mb-4">
        <div className="card-body">
          <form className="form-group form-row my-4">
            <label htmlFor="perPage" className="form-label col-md-2 h5">
              Results per page
            </label>

            <select
              id="perPage"
              className="form-control col-md-8"
              style={{ width: "150px" }}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value={limit}>
                {limit}
                {` (current)`}
              </option>
              {[5, 10, 25, 50]
                .filter((each) => each !== limit)
                .map((each, idx) => (
                  <option key={`limit-option-${idx}`} value={each}>
                    {each}
                  </option>
                ))}
            </select>
          </form>
          <p>
            <code>{`?limit={num}`}</code>
          </p>
          <p>
            The number of results to return. This also determines the number of
            pages for all the results.
          </p>
        </div>
      </div>

      {/* ================ Sort by ================== */}
      <div className="card mb-4">
        <div className="card-body">
          <form className="form-group form-row my-4">
            <label htmlFor="sortBy" className="form-label col-md-2 h5">
              Sort by:
            </label>
            <select
              id="sortBy"
              className="form-control col-md-8"
              style={{ width: "200px" }}
              onChange={(e) => setSort(e.target.value)}
            >
              <option
                value={`name.firstName`}
              >{`First Name (ascending)`}</option>
              <option
                value={`-name.firstName`}
              >{`First Name (descending)`}</option>
            </select>
          </form>
          <p>
            <code>{`?sort={field}`}</code>
          </p>
          <p>
            Sort the results by selected field, in ascending or descending
            order.
          </p>
        </div>
      </div>

      {/* ================ Select ================== */}
      <div className="card mb-4">
        <div className="card-body">
          <form className="form-group form-row my-4">
            <label className="form-label col-12 h5 mb-4">Select fields:</label>
            {fields.map((each, idx) => (
              <FieldCheckBox
                key={`field-label-${idx}`}
                label={each[0]}
                value={each[1].join(".")}
                defaultChecked
                onChange={(e) =>
                  setSelect((prev) => {
                    console.log(e.target.value);
                    if (prev.includes(e.target.value)) {
                      return prev.filter((each) => each !== e.target.value);
                    } else {
                      return [...prev, e.target.value];
                    }
                  })
                }
              />
            ))}
          </form>
          <p>
            <code>select=name,position,contact</code>
          </p>
          <p>
            Selects the fields to return for results. If no fields are selected,
            the query will return all fields by default.
          </p>
          <button
            type="button"
            className="btn btn-primary my-4"
            onClick={() => refetch()}
          >
            Update fields
          </button>
        </div>
      </div>
    </>
  );
};

const ContactRow = ({ contact, ...rest }) => {
  return (
    <tr {...rest}>
      {fields.map((each, idx) => (
        <td key={`get-table-info-row-${contact._id}-${idx}`}>
          {getNestedObject(contact, each[1])}
        </td>
      ))}
    </tr>
  );
};

const FieldCheckBox = ({ label, onChange, value, defaultChecked }) => {
  return (
    <>
      <div
        className="custom-control custom-switch custom-control-inline"
        style={{ zIndex: "0" }}
      >
        <input
          type="checkbox"
          className="custom-control-input"
          id={label.toLowerCase()}
          defaultChecked={defaultChecked}
          value={value}
          onChange={onChange}
        />
        <label className="custom-control-label" htmlFor={label.toLowerCase()}>
          {label}
        </label>
      </div>
    </>
  );
};

export default GetContacts;
