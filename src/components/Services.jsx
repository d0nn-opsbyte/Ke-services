import React from "react";

function Services() {
  return (
    <div>
      <h1>Services</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Provider</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plumbing</td>
            <td>John Doe</td>
            <td>KSh 1,500</td>
          </tr>
          <tr>
            <td>Tutoring</td>
            <td>Jane Smith</td>
            <td>KSh 2,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default Services;

