import React from "react";
import { useQuery } from "react-query";

const QueryTest = () => {
  const URL = "https://project-contacts-api.vercel.app/api/v1/contacts";

  const fetchPlanets = async () => {
    const res = await fetch(URL);
    return res.json();
  };

  const { data, status } = useQuery("planets", fetchPlanets);
  return status === "loading" ? (
    "Loading..."
  ) : (
    <>
      <p>{data && JSON.stringify(data)}</p>
    </>
  );
};

export default QueryTest;
