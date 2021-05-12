import React, { useState } from "react";
import { Formik } from "formik";
import { useQuery } from "react-query";
import { useAlert } from "react-alert";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import { FIELDS, URL, TIMESTAMP } from "../utils/constants";
import getNestedObject from "../utils/getNestedObject";
import Spinner from "./Spinner";
import { GlobalContext } from "../context";

const PutContact = () => {
  const alert = useAlert();
  const { params } = useRouteMatch();
  console.log(params);

  const { selectedContact } = React.useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  const fetchContactById = async () => {
    const res = await fetch(`${URL}/${selectedContact}`);
    return res.json();
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.put(`${URL}/${selectedContact}`, values);
      if (res.data.success === true) {
        setLoading(false);
        alert.success(`Contact updated - ${TIMESTAMP}`);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert.error(
          `Error updating contact ${selectedContact} - ${error.response.data.error.join(
            ". "
          )}`
        );
        setLoading(false);
      }
    }
  };

  const { data, status } = useQuery(["contact", params.id], fetchContactById);

  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    "Error fetching data"
  ) : (
    <Formik
      initialValues={data.data}
      onSubmit={(values) => {
        setLoading(true);
        onSubmit(values);
      }}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => {
        // formik js functions here
        return (
          <>
            <form className="my-5 container">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor={FIELDS[0][1]}>{FIELDS[0][0]}</label>
                  <select
                    id={FIELDS[0][1]}
                    className="form-control"
                    onChange={handleChange}
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
                {FIELDS.filter(
                  (each) => each[0] !== "Salutation" && each[0] !== "Notes"
                ).map(([label, key], idx) => (
                  <div
                    key={`post-field-${key.join(".")}-${idx}`}
                    className="col-md-6 form-group"
                  >
                    <label htmlFor={key.join(".")}>{label}</label>
                    <input
                      type="text"
                      id={key.join(".")}
                      onBlur={handleBlur}
                      value={getNestedObject(values, key)}
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="col-12 form-group">
                  <label htmlFor={FIELDS[FIELDS.length - 1][1]}>
                    {FIELDS[FIELDS.length - 1][0]}
                  </label>
                  <textarea
                    id={FIELDS[FIELDS.length - 1][1][0]}
                    onBlur={handleBlur}
                    className="form-control"
                    value={values[FIELDS[FIELDS.length - 1][1][0]]}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 form-group">
                  <button
                    type="button"
                    className="btn mr-3 btn-info"
                    onClick={handleSubmit}
                  >
                    {!loading ? (
                      `Update contact`
                    ) : (
                      <>
                        <Spinner className="spinner-border-sm mr-2" />
                        <span>Updating...</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn mr-3 btn-danger"
                    onClick={handleSubmit}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default PutContact;
