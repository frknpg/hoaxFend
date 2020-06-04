import React from 'react';

const HoaxView = ({ hoax }) => {

  return (
    <div className="card p-1">
      {hoax.content}
    </div>
  );
};

export default HoaxView;