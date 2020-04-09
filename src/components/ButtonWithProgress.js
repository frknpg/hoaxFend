import React from 'react';

const ButtonWithProgress = (props) => {
  const { disabled, pendingApiCall, onClick, text, className } = props;

  return (
    <button
      disabled={disabled}
      className={className || "btn btn-primary"}
      onClick={onClick}>
      {pendingApiCall && <span className="spinner-border spinner-border-sm" />}
      {text}
    </button>
  );
};

export default ButtonWithProgress;