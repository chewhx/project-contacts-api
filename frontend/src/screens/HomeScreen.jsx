import React from "react";
import { useQuery } from "react-query";
import FullTable from "../react-table/FullTable";
import { URL } from "../utils/constants";
import columns from "../react-table/columns";

const HomeScreen = () => {
  const contactsFetchQuery = async () => {
    const res = await fetch(`${URL}?all=true`);
    return res.json();
  };
  const { status, data } = useQuery("contacts", contactsFetchQuery, {
    keepPreviousData: true,
  });

  return (
    <>
      
      <section id="allContacts" className=" max-w-4xl my-5">
        {status === "loading" && !data ? (
          <>
            <div className="text-center h-100 pt-5">
              <i
                className="bi bi-cloud-download"
                style={{ fontSize: "10rem" }}
              ></i>
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
          <FullTable data={data} columns={columns} />
        ) : null}
      </section>
    </>
  );
};

export default HomeScreen;
