import React from "react";

const Spinner = ({ style, className, ...rest }) => {
  return (
    <span>
      <div
        style={style}
        className={`ml-2 spinner-border ${className}`}
        {...rest}
      ></div>
    </span>
  );
};

export default Spinner;
