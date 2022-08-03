import React from 'react';

const ErrorModal = children => {
  return (
    <div
      style={{ fontSize: 10, textAlign: 'center', justifyContent: 'center' }}
    >
      <h4>{children}</h4>
    </div>
  );
};

export default ErrorModal;
