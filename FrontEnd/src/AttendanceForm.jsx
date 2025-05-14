import React from 'react';

const AttendanceForm = () => {
  return (
    <form className="form">
      <h2>Attendance Form</h2>
      <label htmlFor="rollNumber">Roll Number:</label>
      <input type="text" id="rollNumber" name="rollNumber" required />
      <button type="submit">Get Attendance</button>
    </form>
  );
};

export default AttendanceForm;
