import React from "react";

const Notification = ({ message, color }) => {
  if (message == null) {
    return null;
  }
  return (
    <div className={`alert alert-${color} shadow-lg`}>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
