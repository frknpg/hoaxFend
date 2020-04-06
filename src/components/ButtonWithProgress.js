import React from 'react';

const ButtonWithProgress = (props) => {
  const { disabled, pendingApiCall, onClick, text } = props;

  return (
    <button
      disabled={disabled}
      className="btn btn-primary"
      onClick={onClick}>
      {pendingApiCall && <span className="spinner-border spinner-border-sm" />}
      {text}
    </button>
  );
};

export default ButtonWithProgress;