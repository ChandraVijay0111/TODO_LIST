import React from 'react';

const About = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', marginTop: '-100px', marginLeft: '120px' }}
    >
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card shadow p-4">
          <h2 className="mb-4 text-center">About Us</h2>
          <p className="lead text-center">
            <strong>ToDo List</strong> is a simple and intuitive task management app designed to help you stay organized,
            focused, and productive throughout your day. Easily manage your daily tasks, set priorities, and track your progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
