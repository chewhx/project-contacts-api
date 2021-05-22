import React from "react";
import columns from "../react-table/columns";
import { URL, FIELDS } from "../utils/constants";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import Table from "./Table";
import { useFormik } from "formik";

const AllContacts = () => {
  const formik = useFormik({
    initialValues: {
      page: 1,
      limit: 5,
      sort: "name.firstName",
      select: FIELDS.map((each) => each[1].join(".")),
    },
    onSubmit: (values) => {
      refetch();
    },
    enableReinitialize: true,
  });
  const contactsFetchQuery = async (values) => {
    console.log(values);
    const { limit, sort, page, select } = values.queryKey[1];
    let limitURLquery = `limit=${limit}`;
    let pageURLquery = `page=${page}`;
    let sortURLquery = `sort=${sort}`;
    let selectURLquery = select.length >= 1 ? `&select=${String(select)}` : ``;

    let queryURL = `${URL}?${sortURLquery}&${limitURLquery}&${pageURLquery}${selectURLquery}`;

    const res = await fetch(queryURL);
    return res.json();
  };

  const { status, data, isPreviousData, isFetching, refetch } = useQuery(
    ["contacts", formik.values],
    contactsFetchQuery,
    {
      keepPreviousData: true,
      // enabled: false,
    }
  );

  return status === "loading" && !data ? (
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
  ) : status === "success" ? (
    <div className="container table-responsive">
      {isFetching && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      <p>This tables uses server side pagination, sorting, field selection.</p>

      <Table
        columns={columns}
        data={data}
        formik={formik}
        isPreviousData={isPreviousData}
      />
    </div>
  ) : null;
};

export default AllContacts;
