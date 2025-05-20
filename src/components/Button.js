import React from 'react';

const Button = ({ type, texto }) => {
  return (
    <button
      className="ui button"
      type={type}>
      {texto}
    </button>
  );
};

export default Button;
