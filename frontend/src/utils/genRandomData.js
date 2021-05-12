import faker from "faker/locale/en";
import fakerzh from "faker/locale/zh_CN";

/**
 * To generate blank data, insert "blank" in argument.
 * @param {*} any
 * @returns Randomly generated data for fields defined in the function
 */
const generateRandomData = (arg) => {
  let salutation,
    firstName,
    lastName,
    alias,
    organisation,
    position,
    address,
    telephone,
    mobile,
    email,
    notes;

  const pickRandom = (arr) => {
    if (!arr.length) return undefined;
    let randomNo = Math.floor(Math.random() * arr.length);
    return arr[randomNo];
  };

  if (arg === "blank") {
    firstName = "";
    lastName = "";
    alias = "";
    organisation = "";
    position = "";
    address = "";
    telephone = "";
    mobile = "";
    email = "";
    notes = "";
  } else {
    salutation = pickRandom([
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
    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    alias = fakerzh.name.firstName();
    organisation = faker.company.companyName();
    position = faker.name.jobTitle();
    address = faker.address.streetAddress();
    telephone = faker.phone.phoneNumber();
    mobile = faker.phone.phoneNumber();
    email = faker.internet.exampleEmail();
    notes = faker.lorem.paragraph();
  }

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

export default generateRandomData;
