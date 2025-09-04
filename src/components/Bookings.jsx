import React from "react";

function Bookings() {
  return (
    <div>
      <h1>Bookings</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Client</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plumbing</td>
            <td>Mary</td>
            <td>✅ Completed</td>
          </tr>
          <tr>
            <td>Tutoring</td>
            <td>James</td>
            <td>⏳ Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default Bookings;

