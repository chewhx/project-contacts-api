import { Link } from "react-router-dom";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
const columns = [
  {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <>
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      </>
    ),
    Cell: ({ row }) => (
      <>
        <IndeterminateCheckbox
          id={`row-${row.id}`}
          {...row.getToggleRowSelectedProps()}
        />
      </>
    ),
  },
  {
    Header: "",
    accessor: "_id",
    Cell: ({ value }) => (
      <>
        <Link to={`/contacts/${value}`} target="_blank">
          <i className="bi bi-box-arrow-in-up-right"></i>
        </Link>
      </>
    ),
  },
  { Header: "First Name", accessor: "name.firstName" },
  { Header: "Last Name", accessor: "name.lastName" },
  { Header: "Alias", accessor: "name.alias" },
  { Header: "Organisation", accessor: "organisation" },
  { Header: "Position", accessor: "position" },
  { Header: "Telephone", accessor: "contact.telephone" },
  { Header: "Mobile", accessor: "contact.mobile" },
  { Header: "Email", accessor: "contact.email" },
];

export default columns;
