import React from "react";
import { Formik } from "formik";
import faker from "faker/locale/en";
import fakerzh from "faker/locale/zh_CN";

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

const generateRandomData = () => {
  const pickRandom = (arr) => {
    if (!arr.length) return undefined;
    let randomNo = Math.floor(Math.random() * arr.length);
    return arr[randomNo];
  };

  let salutation = pickRandom([
    "Mr",
    "Ms",
    "Mrs",
    "Mdm",
    "Prof",
    "Dr",
    "Sir",
    "Mx",
    "Ind",
  ]);
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let alias = fakerzh.name.firstName();
  let organisation = faker.company.companyName();
  let position = faker.name.jobTitle();
  let address = faker.address.streetAddress();
  let telephone = faker.phone.phoneNumber();
  let mobile = faker.phone.phoneNumber();
  let email = faker.internet.exampleEmail();
  let notes = faker.lorem.paragraph();

  return {
    salutation,
    name: { firstName, lastName, alias },
    organisation,
    position,
    address,
    contact: { telephone, mobile, email },
    notes,
  };
};

const PostContact = () => {
  return (
    <Formik
      initialValues={generateRandomData()}
      onSubmit={(values) => console.log(values)}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, setValues, handleSubmit }) => {
        // formik js functions here
        return (
          <>
            <form>
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
                      <label htmlFor={key}>{label}</label>
                      <input
                        type="text"
                        id={key}
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
                    className="btn mr-3 btn-primary"
                    onClick={handleSubmit}
                  >
                    POST
                  </button>
                  <button
                    type="button"
                    className="btn mr-3 btn-info"
                    onClick={() => setValues(generateRandomData())}
                  >
                    RANDOM
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
