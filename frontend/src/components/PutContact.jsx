import React, { useState } from "react";
import { Formik } from "formik";
import { useQuery } from "react-query";
import { useAlert } from "react-alert";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";
import { FIELDS, URL, TIMESTAMP } from "../utils/constants";
import getNestedObject from "../utils/getNestedObject";
import Spinner from "./Spinner";
import { GlobalContext } from "../context";

const PutContact = ({ match }) => {
  const alert = useAlert();
  const { params } = useRouteMatch();
  console.log(params);

  const { selectedContact, setShowModal } = React.useContext(GlobalContext);

  const [areYouSure, setAreYouSure] = useState(false);

  const fetchContactById = async () => {
    const res = await fetch(`${URL}/${selectedContact || match.params.id}`);
    return res.json();
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.put(
        `${URL}/${selectedContact || match.params.id}`,
        values
      );
      if (res.data.success === true) {
        alert.success(`Contact updated - ${TIMESTAMP}`);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert.error(
          `Error updating contact ${
            selectedContact || match.params.id
          } - ${error.response.data.error.join(". ")}`
        );
      }
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`${URL}/${id}`);
      if (res.data.success === true) {
        setShowModal(false);
        alert.success(`Contact deleted - ${TIMESTAMP}`);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert.error(
          `Error deleting contact ${
            selectedContact || match.params.id
          } - ${error.response.data.error.join(". ")}`
        );
      }
    }
  };

  const { data, status } = useQuery(["contact", params.id], fetchContactById);

  return status === "loading" ? (
    <div className="text-center h-100 pt-5">
      <Spinner
        className="spinner-border-lg my-auto"
        style={{ width: "10rem", height: "10rem" }}
      />
      <p className="mt-5">Loading...</p>
    </div>
  ) : status === "error" ? (
    "Error fetching data"
  ) : (
    <Formik
      initialValues={data.data}
      onSubmit={(values) => onSubmit(values)}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
        // formik js functions here
        return (
          <>
            <form className="my-5 container">
              <h1 className="text-center">
                Edit contact
                <span>
                  <button type="button" className="btn btn-link ml-auto">
                    <Link
                      to={`/contacts/${selectedContact || match.params.id}`}
                      target="_blank"
                    >
                      <i class="bi bi-box-arrow-in-up-right"></i>
                    </Link>
                  </button>
                </span>
              </h1>
              <div className="col-12 form-group my-3">
                <button
                  type="button"
                  className="btn mr-3 btn-info"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {!isSubmitting ? (
                    `Update contact`
                  ) : (
                    <>
                      <Spinner className="spinner-border-sm mr-2" />
                      <span>Updating...</span>
                    </>
                  )}
                </button>

                {!areYouSure ? (
                  <button
                    type="button"
                    className="btn mr-3 btn-danger"
                    onClick={() => setAreYouSure(true)}
                  >
                    Delete
                  </button>
                ) : (
                  <div className="alert alert-danger mx-auto my-3">
                    Are you sure? You are about to <strong>DELETE</strong> this
                    contact.
                    <button
                      type="button"
                      className="btn ml-3 mr-3 btn-warning"
                      onClick={() => setAreYouSure(false)}
                    >
                      <strong>Go back, I do not want to delete.</strong>
                    </button>
                    <button
                      type="button"
                      className="btn mr-3 btn-danger"
                      onClick={() => deleteContact(data.data._id)}
                    >
                      Confirm deletion
                    </button>
                  </div>
                )}
              </div>
              <ul className="list-group list-group-flush my-4">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-2">
                      <strong>{FIELDS[0][0]}</strong>
                    </div>
                    <div className="col-md-10">
                      <select
                        id={FIELDS[0][1]}
                        className="form-control"
                        onChange={handleChange}
                        disabled={isSubmitting}
                        value={values["salutation"]}
                      >
                        {[
                          "Mr",
                          "Ms",
                          "Mrs",
                          "Mdm",
                          "Prof",
                          "Dr",
                          "Sir",
                          "Mx",
                          "Ind",
                        ].map((each, idx) => (
                          <option value={each} key={`salutation-option-${idx}`}>
                            {each}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </li>
                {FIELDS.filter(
                  (each) => each[0] !== "Salutation" && each[0] !== "Notes"
                ).map(([label, keys], idx) => (
                  <li className="list-group-item" key={`edit-${idx}`}>
                    <div className="row">
                      <div className="col-md-2">
                        <strong>{label}</strong>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="text"
                          id={keys.join(".")}
                          onBlur={handleBlur}
                          value={getNestedObject(values, keys)}
                          className="form-control"
                          disabled={isSubmitting}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </li>
                ))}
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-2">
                      <strong>{FIELDS[FIELDS.length - 1][0]}</strong>
                    </div>
                    <div className="col-md-10">
                      <textarea
                        id={FIELDS[FIELDS.length - 1][1][0]}
                        onBlur={handleBlur}
                        className="form-control"
                        value={values[FIELDS[FIELDS.length - 1][1][0]]}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default PutContact;
