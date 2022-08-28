import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function EmployeesTask({ employeesTask }) {
  return (
    <div>
      <h1>Hey there !!!</h1>
      <h3>
        <Link to="/workinghours">
          Click to see how much each employee worked.
        </Link>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>EmployeeName</th>
            <th>StartTimeUtc</th>
            <th>EndTimeUtc</th>
            <th>EntryNotes</th>
            <th>DeletedOn</th>
          </tr>
        </thead>
        <tbody>
          {employeesTask.map((task) => {
            return (
              <tr key={task.Id}>
                <td>{task.Id}</td>
                <td>{task.EmployeeName}</td>
                <td>{task.StarTimeUtc}</td>
                <td>{task.EndTimeUtc}</td>
                <td>{task.EntryNotes}</td>
                <td>{task.DeletedOn}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesTask;
