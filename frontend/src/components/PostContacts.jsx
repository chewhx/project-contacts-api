import React from "react";
import { Formik } from "formik";

const fields = [
  ["Salutation", "salutation"],
  ["First Name", "name.firstName"],
  ["Last Name", "name.firstName"],
  ["Alias", "name.alias"],
  ["Organisation", "organisation"],
  ["Position", "position"],
  ["Address", "address"],
  ["Telephone", "contact.telephone"],
  ["Mobile", "contact.mobile"],
  ["Email", "contact.email"],
  ["Notes", "notes"],
];

const PostContacts = () => {
  return (
    <Formik
      initialValues={{
        salutation: "",
        name: { firstName: "", lastName: "", alias: "" },
        organisation: "",
        position: " ",
        address: "",
        contact: {
          telephone: "",
          mobile: "",
          email: "",
        },
        notes: "",
      }}
      onSubmit={(values) => console.log(values)}
      enableReinitialize
    >
      {({ values, handleChange }) => {
        console.log(values);
        return (
          <>
            <form>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label for={fields[0][1]}>{fields[0][0]}</label>
                  <select
                    id={fields[0][1]}
                    className="form-control"
                    onChange={handleChange}
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
                      <label for={key}>{label}</label>
                      <input
                        type="text"
                        id={key}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                <div className="col-12">
                  <label for={fields[fields.length - 1][1]}>
                    {fields[fields.length - 1][0]}
                  </label>
                  <textarea
                    id={fields[fields.length - 1][1]}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default PostContacts;
