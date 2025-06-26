import React from 'react';

const Before = () => {
  const id = sessionStorage.getItem("id");

  if (id) {
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="alert alert-warning text-center" role="alert">
        <h4 className="alert-heading">Please Sign Up</h4>
        <p>You need to sign up first to use the app.</p>
      </div>
    </div>
  );
};

export default Before;
