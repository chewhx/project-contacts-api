import React from "react";
import columns from "../react-table/columns";
import { URL } from "../utils/constants";
import { useQuery } from "react-query";
import Spinner from "./Spinner";
import Table from "../react-table/Table";

const AllContacts = () => {
  const fetchContacts = async () => {
    const res = await fetch(`${URL}?all=true`);
    return res.json();
  };

  const { status, data } = useQuery("contacts", fetchContacts, {
    keepPreviousData: true,
  });
  return status === "loading" ? (
    <div className="text-center h-100 pt-5">
      <Spinner
        className="spinner-border-lg my-auto"
        style={{ width: "10rem", height: "10rem" }}
      />
      <p className="mt-5">Loading...</p>
    </div>
  ) : status === "error" ? (
    "Error"
  ) : status === "success" ? (
    <div className="container table-responsive">
      <Table columns={columns} data={data.data} />
    </div>
  ) : null;
};

export default AllContacts;
