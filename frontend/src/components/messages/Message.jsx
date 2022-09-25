import React from "react";

const Message = ({ color, message }) => {
  return (
    <div className={`alert alert-${color} shadow-lg`}>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Message;
