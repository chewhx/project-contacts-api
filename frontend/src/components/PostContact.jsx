import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useQuery } from "react-query";
import { useAlert } from "react-alert";
import { URL, FIELDS } from "../utils/constants";
import generateRandomData from "../utils/genRandomData";
import getNestedObject from "../utils/getNestedObject";
import Spinner from "../components/Spinner";

const PostContact = () => {
  const alert = useAlert();

  const countryCodesFetchQuery = async () => {
    const res = await fetch(
      `https://restcountries.eu/rest/v2/all?fields=name;callingCodes;alpha2Code`
    );
    return res.json();
  };

  const { status, data: countryCodes } = useQuery(
    "countryCodes",
    countryCodesFetchQuery,
    { keepPreviousData: true }
  );
  console.log(countryCodes);

  const postNewContact = async (values) => {
    try {
      const res = await axios.post(`${URL}`, values);
      if (res.data.success === true) {
        generateRandomData();
        alert.success("New contact created");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert.error(
          `Error adding new contact - ${error.response.data.error.join(". ")}`
        );
      }
    }
  };
  return (
    <Formik
      initialValues={generateRandomData("blank")}
      onSubmit={(values) => postNewContact(values)}
      enableReinitialize={true}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        setValues,
        handleSubmit,
      }) => {
        // formik js functions here
        return (
          <>
            <form className="my-5 container">
              <ul className="list-group my-4">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-2">
                      <strong>{FIELDS[0][0]}</strong>
                    </div>
                    <div className="col-md-10">
                      <select
                        id={FIELDS[0][1]}
                        className="form-control bg-light"
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
                          className="form-control bg-light"
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
                        className="form-control bg-light"
                        value={values[FIELDS[FIELDS.length - 1][1][0]]}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-md-2">
                      <strong>{`Code`}</strong>
                    </div>
                    <div className="col-md-10">
                      <select
                        list="country-calling-codes"
                        className="form-control bg-light"
                      >
                        {status === "success" &&
                          countryCodes.map((each, idx) => (
                            <option
                              key={`country-code-${idx}`}
                              value={`+${each.callingCodes[0]}`}
                            >
                              {`${each.name} +${each.callingCodes[0]} `}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </li>
              </ul>
              {/* <form className="my-5">
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
                </div> */}
              <div className="col">
                <button
                  type="button"
                  className="btn mr-3 btn-primary"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {!isSubmitting ? (
                    "Add contact"
                  ) : (
                    <>
                      <Spinner className="spinner-border-sm mr-2" />
                      <span>Uploading...</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn mr-3 btn-info"
                  onClick={() => setValues(generateRandomData())}
                >
                  Generate random
                </button>
                <button
                  type="button"
                  className="btn mr-3 btn-danger"
                  onClick={() => {
                    setValues(generateRandomData("blank"));
                  }}
                >
                  CLEAR
                </button>
              </div>
              {/* </div> */}
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default PostContact;
