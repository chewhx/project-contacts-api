import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter, ...rest }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);

  return (
    <>
      <input
        {...rest}
        type="search"
        value={value || ""}
        placeholder="Search contacts..."
        className="form-control form-control-lg"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </>
  );
};

export default GlobalFilter;
