import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { useAlert } from "react-alert";
import { URL, FIELDS } from "../utils/constants";
import generateRandomData from "../utils/genRandomData";
import getNestedObject from "../utils/getNestedObject";
import Spinner from "../components/Spinner";

const PostContact = () => {
  const alert = useAlert();

  const [loading, setLoading] = useState(true);

  const postNewContact = async (values) => {
    const res = await axios.post(`${URL}`, values);
    if (res.data.success === true) {
      setLoading(false);
      generateRandomData();
      alert.success("New contact created");
    }
  };
  return (
    <Formik
      initialValues={generateRandomData()}
      onSubmit={(values) => {
        setLoading(true);
        postNewContact(values);
      }}
      // enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, setValues, handleSubmit }) => {
        // formik js functions here
        return (
          <>
            <form className="my-5">
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
                </div>
                <div className="col-12 form-group">
                  <button
                    type="button"
                    className="btn mr-3 btn-primary"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {!loading ? (
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
                    MOCK DATA
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
              </div>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default PostContact;
