export const URL = `https://project-contacts-api.vercel.app/api/v1/contacts`;

export const FIELDS = [
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

export const TIMESTAMP = new Date().toLocaleString("en-SG");
