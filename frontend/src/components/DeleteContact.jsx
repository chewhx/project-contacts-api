import React, { useState } from "react";
import { useQuery } from "react-query";

const fields = [
  ["Salutation", ["salutation"]],
  ["First Name", ["name", "firstName"]],
  ["Last Name", ["name", "lastName"]],
  ["Alias", ["name", "alias"]],
  ["Organisation", ["organisation"]],
  ["Position", ["position"]],
  ["Address", ["address"]],
  ["Telephone", ["contact", "telephone"]],
  ["Mobile", ["contact", "mobile"]],
  ["Email", ["contact", "email"]],
  ["Notes", ["notes"]],
];

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};
// Credits for nested object function: https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f

const DeleteContact = () => {
  const [contact, setContact] = useState();
  const URL = `https://project-contacts-api.vercel.app/api/v1/contacts`;

  const fetchContacts = async () => {
    const res = await fetch(URL);
    return res.json();
  };
  const { data, status } = useQuery("contacts", fetchContacts);

  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    "Error fetching data"
  ) : (
    <>
      <form>
        <label htmlFor="contact-id">Select a contact to delete:</label>
        <select
          id="contact-id"
          className="form-control"
          onChange={(e) =>
            setContact(
              data.data.filter((contact) => contact._id === e.target.value)[0]
            )
          }
        >
          {data.data.map((contact, idx) => (
            <option
              key={`contact-info-field-${idx}`}
              value={contact._id}
            >{`${contact.name.lastName}, ${contact.name.firstName}`}</option>
          ))}
        </select>
      </form>
      {fields.map(([label, keys], idx) => (
        <ContactRow label={label} info={getNestedObject(contact, keys)} />
      ))}
      <button type="button" className="btn btn-danger">
        DELETE
      </button>
    </>
  );
};

export default DeleteContact;

const ContactRow = ({ label, info }) => (
  <li className="list-group item">
    <div className="row">
      <div className="col-2">{label}</div>
      <div className="col-10">{info}</div>
    </div>
  </li>
);
