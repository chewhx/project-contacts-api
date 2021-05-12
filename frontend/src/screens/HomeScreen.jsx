import React, { useContext, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import DeleteContact from "../components/DeleteContact";
import GetContacts from "../components/GetContacts";
import PostContact from "../components/PostContact";
import PutContact from "../components/PutContact";
import ReactModal from "react-modal";
import { GlobalContext } from "../context";

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
  const alert = useAlert();
  const params = useParams();

  const { selectedContact, setSelectedContact } = useContext(GlobalContext);

  const [modal, setModal] = useState(false);

  ReactModal.defaultStyles.content.zIndex = "1200px";

  return (
    <>
      
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setModal(true)}
      >
        Modal
      </button>
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

      <section id="getAll" className="container-fluid bg-light py-5">
        <div className="container py-5">
          <h1>GET - /api/v1/contacts</h1>
          <GetContacts />
        </div>
      </section>

      <section id="postOne" className="container-fluid bg-white py-5">
        <div className="container py-5">
          <h1>POST - /api/v1/contacts</h1>
          <p className="alert alert-secondary">
            Note: For security purposes, data will not be posted to the actual
            database without a test key.
          </p>
          <PostContact />
        </div>
      </section>
      <section id="putOne" className="container-fluid bg-light py-5">
        <div className="container py-5">
          <h1>PUT - /api/v1/contacts</h1>
          <p className="alert alert-secondary">
            Select a contact from the <a href="#getAll">GET</a> section to begin
            submitting changes.
          </p>
          <Switch>
            <Route path={`/put/:id`} component={PutContact} />
          </Switch>
        </div>
      </section>
      <section id="deleteOne" className="container-fluid py-5">
        <div className="container py-5">
          <h1>DELETE - /api/v1/contacts/:id</h1>
          <p className="alert alert-secondary">Note:</p>
          <DeleteContact />
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
