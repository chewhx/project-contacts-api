import React, { useState } from "react";
import ReactModal from "react-modal";
import { useQuery } from "react-query";
import { FIELDS, URL } from "../utils/constants";
import getNestedObject from "../utils/getNestedObject";
import { useFormik } from "formik";
import PutContact from "./PutContact";
import { LinkContainer } from "react-router-bootstrap";
import {
  NavLink,
  Route,

  useLocation,
} from "react-router-dom";
// import { GlobalContext } from "../context";

ReactModal.setAppElement("#root");

const ContactsTable = () => {
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      page: 1,
      limit: 5,
      sort: "name.firstName",
      select: FIELDS.map((each) => each[1].join(".")),
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const fetchContacts = async (values) => {
    console.log(values.queryKey[1]);
    const { limit, sort, page } = values.queryKey[1];
    let limitURLquery = `limit=${limit}`;
    let pageURLquery = `page=${page}`;
    let sortURLquery = `sort=${sort}`;
    // let selectURLquery = select.length >= 1 ? `&select=${String(select)}` : ``;
    console.log(`${URL}?${sortURLquery}&${limitURLquery}&${pageURLquery}`);
    const res = await fetch(
      `${URL}?${sortURLquery}&${limitURLquery}&${pageURLquery}`
    );

    return res.json();
  };

  const { status, data, isPreviousData, refetch, isFetching } = useQuery(
    ["contacts", values /* limit, sort*/],
    fetchContacts,
    {
      enabled: !!values,
      keepPreviousData: true,
    }
  );

  let location = useLocation;
  let background = location.state && location.state.background;

  background && <Route path="/img/:id" children={<ContactsTable.Modal />} />;

  return status === "loading" ? (
    <>
      <div className="text-center h-100 pt-5">
        <i className="bi bi-cloud-download" style={{ fontSize: "10rem" }}></i>
        <p>Fetching your awesome contacts...</p>
      </div>
    </>
  ) : status === "error" ? (
    <>
      <div className="text-center h-100 pt-5">
        <i
          className="bi bi-exclamation-circle"
          style={{ fontSize: "10rem" }}
        ></i>
        <h5>Error loading your data...</h5>
        <p>Please check with the administrator</p>
      </div>
    </>
  ) : (
    <>
      <div className="container table-responsive">
        <table
          className={`table bg-white table-borderless ${
            !isFetching && `table-hover`
          }`}
        >
          <thead>
            <tr className="border-bottom">
              {FIELDS.filter((each) => each[0] !== "Notes").map((each, idx) => (
                <th key={`get-table-header-${idx}`} scope="col">
                  {each[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((contact, idx) => (
              <ContactsTable.Row
                key={`contact-${idx}`}
                contact={contact}
                style={{ cursor: "pointer" }}
                refetch={refetch}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="text-center border-top">
              <td colSpan="12">
                {Array.from(Array(data.pages).keys()).map((each, idx) => (
                  <button
                    key={`page-btn-${idx}`}
                    className={`btn btn-sm mx-1 font-weight-bold ${
                      values.page === each + 1
                        ? "btn-outline-secondary"
                        : "btn-link"
                    }`}
                    onClick={() => setFieldValue("page", each + 1)}
                    disabled={values.page === each + 1}
                  >
                    {each + 1}
                  </button>
                ))}
              </td>
            </tr>
            <tr>
              <td colSpan="12" className="border-top">
                <div className="row flex align-items-center justify-content-center">
                  <button
                    type="button"
                    className="btn btn-light btn-sm mx-3"
                    onClick={() =>
                      setFieldValue("page", Math.max(values.page - 1, 1))
                    }
                    disabled={!data.pagination.prev}
                  >
                    <i className="bi bi-caret-left-fill"></i>
                  </button>
                  <input
                    hidden
                    id="page"
                    name="page"
                    value={values.page}
                    className="form-control font-weight-bold"
                    style={{
                      width: "50px",
                      minWidth: "50px",
                      maxWidth: "50px",
                    }}
                    onChange={handleChange}
                  />
                  <span className="font-weight-bold">
                    Page {values.page} / {data.pages}
                  </span>
                  <button
                    type="button"
                    className="btn btn-light btn-sm mx-3"
                    onClick={() =>
                      setFieldValue(
                        "page",
                        Math.min(values.page + 1, data.pages)
                      )
                    }
                    disabled={isPreviousData || !data.pagination.next}
                  >
                    <i className="bi bi-caret-right-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

ContactsTable.Row = function ContactsTableRow({ contact, refetch, ...rest }) {
  // const [modal, setModal] = useState(false);
  return (
    <>
      <tr
        {...rest}
        className="border-bottom"
        onClick={() => {
          // setModal(true);
        }}
      >
        {FIELDS.filter((each) => each[0] !== "Notes").map((each, idx) => (
          <td key={`contacts_table_row_${contact._id}_${idx}`}>
            {getNestedObject(contact, each[1])}
          </td>
        ))}
        {/* <ContactsTable.Modal
          modal={modal}
          setModal={setModal}
          refetch={refetch}
        /> */}
      </tr>
    </>
  );
};

ContactsTable.Modal = function ContactsTableModal({
  modal,
  setModal,
  refetch,
}) {
  return (
    <ReactModal
      isOpen={modal}
      style={{
        overlay: {
          backgroundColor: "var(--light)",
          opacity: "75%",
          zIndex: "2200px",
        },
        content: {
          position: "fixed",
          marginTop: "30px",
          zIndex: "2300px",
          border: "none",
        },
      }}
      overlayElement={(props, contentElement) => {
        return (
          <>
            <div {...props} onClick={() => setModal(false)}></div>
            {contentElement}
          </>
        );
      }}
    >
      <button
        type="button"
        className="btn close sticky-top"
        onClick={() => {
          setModal(false);
          refetch();
        }}
      >
        <span>&times;</span>
      </button>
      <PutContact />
    </ReactModal>
  );
};

export default ContactsTable;
