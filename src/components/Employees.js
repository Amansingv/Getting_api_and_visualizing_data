import React, { useState, useEffect, useCallback } from "react";
import { VictoryPie } from "victory";
import useList from "./useList";
import "../App.css";

function Employees({ employeesTask }) {
  const EmployeeList = useList(employeesTask);
  const [pieData, setPieData] = useState([]);

  function calTotal(pieData) {
    let total = 0;
    pieData.map((data) => (total += data.y));
    return total;
  }

  const addPercentage = useCallback((pieData) => {
    pieData.forEach((data) => {
      let s = ((data.y / calTotal(pieData)) * 100).toFixed(2);
      data.x += " (" + s + "%)";
    });
  }, []);

  const pieSource = useCallback(
    (pieData) => {
      EmployeeList.forEach((employee) => {
        let x = employee.name || "null";
        let y =
          employee.totalTimeWorked.hours +
          "." +
          employee.totalTimeWorked.minutes;

        pieData.push({ x, y: parseFloat(y) });
      });
    },
    [EmployeeList]
  );

  useEffect(() => {
    let pieData = [];
    pieSource(pieData);
    addPercentage(pieData);
    setPieData(pieData);
  }, [addPercentage, pieSource]);

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Total Working Hours</th>
          </tr>
        </thead>
        <tbody>
          {EmployeeList.map((employee, index) => {
            return (
              <tr
                key={index}
                style={{
                  color: employee.totalTimeWorked.hours < 100 && "orangered",
                }}
              >
                <td>{employee.name}</td>
                <td>
                  {employee.totalTimeWorked.hours} hours{" "}
                  {employee.totalTimeWorked.minutes} minutes
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pie-chart">
        <VictoryPie
          colorScale={[
            "tomato",
            "orange",
            "gold",
            "cyan",
            "navy",
            "red",
            "green",
            "pink",
            "olive",
            "black",
            "gray",
          ]}
          data={pieData}
          width="800"
        />
      </div>
    </div>
  );
}

export default Employees;
