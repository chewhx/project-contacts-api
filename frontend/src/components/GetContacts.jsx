import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fields = [
  "First Name",
  "Last Name",
  "Alias",
  "Organisation",
  "Position",
  "Telephone",
  "Mobile",
  "Email",
];

const Contacts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("name.firstName");
  const [select, setSelect] = useState([]);

  const URL = `https://project-contacts-api.vercel.app/api/v1/contacts?limit=${limit}&page=${page}&sort=${sort}`;

  const fetchContacts = async () => {
    const res = await fetch(URL);
    return res.json();
  };

  const { status, data, isPreviousData } = useQuery(
    ["contacts", page, limit, sort],
    fetchContacts,
    {
      keepPreviousData: true,
    }
  );

  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    "Error fetching data"
  ) : (
    <>
      <p>
        Page {page} / {data.pages}{" "}
      </p>
      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Alias</th>
              <th scope="col">Organisation</th>
              <th scope="col">Position</th>
              <th scope="col">Telephone</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((contact, idx) => (
              <ContactRow key={`contact-${idx}`} contact={contact} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-row">
        <form className="form-group mr-4">
          <label htmlFor="perPage" className="form-label">
            Per page
          </label>
          <select
            id="perPage"
            className="form-control"
            style={{ width: "100px" }}
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
        <form className="form-group mr-4">
          <label htmlFor="sortBy" className="form-label">
            Sort by:
          </label>
          <select
            id="sortBy"
            className="form-control"
            style={{ width: "200px" }}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={`name.firstName`}>{`First Name (ascending)`}</option>
            <option
              value={`-name.firstName`}
            >{`First Name (descending)`}</option>
          </select>
        </form>
        <form className="form-group mr-4">
          {fields.map((each, idx) => (
            <FieldCheckBox
              key={`field-label-${idx}`}
              label={each}
              onChange={(e) =>
                setSelect((prev) => {
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
      </div>
      <div className="pagination">
        <button
          className="page-item btn btn-outline-primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!data.pagination.prev}
        >
          Previous
        </button>
        {Array.from(Array(data.pages).keys()).map((each, idx) => (
          <button
            key={`page-btn-${idx}`}
            className="page-item btn btn-outline-primary"
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
    </>
  );
};

const ContactRow = ({ contact }) => {
  return (
    <tr>
      <td>
        <Link to={`/put/${contact._id}`}>{contact.name.firstName}</Link>
      </td>
      <td>{contact.name.lastName}</td>
      <td>{contact.name.alias}</td>
      <td>{contact.organisation}</td>
      <td>{contact.position}</td>
      <td>{contact.contact.telephone}</td>
      <td>{contact.contact.mobile}</td>
      <td>{contact.contact.email}</td>
    </tr>
  );
};

const FieldCheckBox = ({ label, onChange }) => {
  return (
    <>
      <div className="custom-control custom-switch custom-control-inline">
        <input
          type="checkbox"
          className="custom-control-input"
          id={label.toLowerCase()}
          value={label.toLowerCase()}
          onChange={onChange}
        />
        <label className="custom-control-label" htmlFor={label.toLowerCase()}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Contacts;
