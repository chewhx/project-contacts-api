import React from "react";

const Spinner = ({ style, className, ...rest }) => {
  return (
    <div
      style={style}
      className={`spinner-border ${className}`}
      {...rest}
    ></div>
  );
};

export default Spinner;
