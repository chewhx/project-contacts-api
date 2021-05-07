import React from "react";
import { useQuery } from "react-query";

const Contacts = () => {
  const URL = "https://project-contacts-api.vercel.app/api/v1/contacts";

  const fetchContacts = async () => {
    const res = await fetch(URL);
    return res.json();
  };

  const { data, status } = useQuery("planets", fetchContacts);
  console.log(data);
  return status === "loading" ? (
    "Loading..."
  ) : (
    <div className="container">
      <table class="table table-bordered table-hover">
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
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">
            Previous
          </a>
        </li>
        {data.data.pages.map((pageNo, idx) => (
          <li key={`pagination-${idx}`} class="page-item">
            {pageNo}
          </li>
        ))}
        <li class="page-item">
          <a class="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

const ContactRow = ({ contact }) => {
  return (
    <tr>
      <td>{contact.name.firstName}</td>
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

export default Contacts;
