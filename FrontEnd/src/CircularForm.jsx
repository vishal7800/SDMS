import React from 'react';

const CircularForm = () => {
  return (
    <form className="form">
      <h2>Add Circular</h2>
      <label htmlFor="circularDate">Date:</label>
      <input type="date" id="circularDate" name="circularDate" required />

      <label htmlFor="circularContent">Content:</label>
      <textarea id="circularContent" name="circularContent" required></textarea>

      <button type="submit">Add Circular</button>
    </form>
  );
};

export default CircularForm;
