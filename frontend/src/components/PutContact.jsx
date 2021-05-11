import React, { useState } from "react";
import { Formik } from "formik";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

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

const PutContact = () => {
  const { params } = useRouteMatch();
  console.log(params);
  const [putStatus, setPutStatus] = useState({
    success: false,
    message: "",
  });

  const URL = `https://project-contacts-api.vercel.app/api/v1/contacts/${params.id}`;

  const fetchContactById = async () => {
    const res = await fetch(URL);
    return res.json();
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.put(URL, values);
      if (res.data.success === true) {
        setPutStatus({
          success: true,
          message: `Update successful for contact id ${params.id}`,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setPutStatus({
          success: false,
          message: `Error updating contact id ${
            params.id
          } - ${error.response.data.error.join(". ")}`,
        });
      }
    }
  };

  const { data, status } = useQuery(["contact", params.id], fetchContactById);
  console.log(status);

  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    "Error fetching data"
  ) : (
    <Formik
      initialValues={data.data}
      onSubmit={(values) => onSubmit(values)}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => {
        // formik js functions here
        return (
          <>
            <form className="my-5">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor={fields[0][1]}>{fields[0][0]}</label>
                  <select
                    id={fields[0][1]}
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
                {fields
                  .filter(
                    (each) => each[0] !== "Salutation" && each[0] !== "Notes"
                  )
                  .map(([label, key], idx) => (
                    <div
                      key={`post-field-${key}-${idx}`}
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
                  <label htmlFor={fields[fields.length - 1][1]}>
                    {fields[fields.length - 1][0]}
                  </label>
                  <textarea
                    id={fields[fields.length - 1][1][0]}
                    onBlur={handleBlur}
                    className="form-control"
                    value={values[fields[fields.length - 1][1][0]]}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 form-group">
                  <button
                    type="button"
                    className="btn mr-3 btn-info"
                    onClick={handleSubmit}
                  >
                    PUT / UPDATE
                  </button>
                  <span
                    className={
                      putStatus.success ? "text-success" : "text-danger"
                    }
                  >
                    {putStatus && putStatus.message}
                  </span>
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
