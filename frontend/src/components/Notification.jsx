import React from "react";

const Notification = ({ options, message, close }) => {
  return (
    <div
      style={{ width: "100vw" }}
      className={`alert alert-dismissible show fade py-4 ${
        options.type === "info"
          ? `alert-primary`
          : options.type === "success"
          ? `alert-success`
          : options.type === "error"
          ? `alert-danger`
          : null
      }`}
      role="alert"
    >
      {options.type === "success" && (
        <i className="bi bi-check-circle-fill mr-3"></i>
      )}
      {options.type === "error" && (
        <i className="bi bi-exclamation-octagon-fill mr-3"></i>
      )}
      {message}
      <button type="button" className="close mt-2" onClick={() => close()}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Notification;

Notification.defaultProps = {
  message: "Holy guacamole! You should check in on some of those fields below.",
};
