import React from "react";
import ReactModal from "react-modal";
import AllContacts from "../components/AllContacts";

const crudInfo = [
  {
    method: "GET",
    route: "/api/v1/contacts",
    description: "Get all contacts",
    sectionId: "getAll",
  },
  {
    method: "GET",
    route: "/api/v1/contacts/:id",
    description: "Get a contact by id",
    sectionId: "getOne",
  },
  {
    method: "POST",
    route: "/api/v1/contacts",
    description: "Create a contact",
    sectionId: "postOne",
  },
  {
    method: "PUT",
    route: "/api/v1/contacts/:id",
    description: "Update a contact by id",
    sectionId: "putOne",
  },
  {
    method: "DELETE",
    route: "/api/v1/contacts/:id",
    description: "Delete a contact",
    sectionId: "deleteOne",
  },
];

const HomeScreen = () => {
  ReactModal.defaultStyles.content.zIndex = "1200px";

  return (
    <>
      <section
        id="top"
        className="container-fluid py-5 mb-5"
        style={{ background: "var(--primary)" }}
      >
        <div className="container max-w-4xl py-5">
          <p className="display-4 mt-5">
            <strong>{`{Contacts} API`}</strong>
          </p>
          <h4>Mock data API for prototyping address book application</h4>
        </div>
      </section>
      <section id="routes" className="container max-w-4xl py-5 my-5">
        <h1>Routes</h1>
        <ul className="list-unstyled">
          {crudInfo.map((each, idx) => (
            <li key={`resource-${idx}`}>
              <div className="row">
                <div className="col-md-1 col-sm-2">
                  <a href={`/#${each.sectionId}`}>
                    <p>{each.method}</p>
                  </a>
                </div>
                <div className="col-md-2 col-sm-3">
                  <p> {each.route}</p>
                </div>
                <div className="col-lg-auto col-md-12">{each.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section id="allContacts" className=" max-w-4xl py-5 my-5">
        <AllContacts />
      </section>
    </>
  );
};

export default HomeScreen;
