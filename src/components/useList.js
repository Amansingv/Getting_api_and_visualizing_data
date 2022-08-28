import { useState, useEffect } from "react";

function useList(employeesTask) {
  const [EmployeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    let EmployeeSet = [];
    let EmployeeList = [];

    employeesTask.filter(
      (task) =>
        EmployeeSet.includes(task.EmployeeName) ||
        EmployeeSet.push(task.EmployeeName)
    );

    EmployeeSet.forEach((name) => {
      let totalTimeWorked;

      const employee = employeesTask.filter(
        (task) => task.EmployeeName === name
      );
      totalTimeWorked = employee.map((task) =>
        msToTime(Math.abs(dateDiffInMs(task.StarTimeUtc, task.EndTimeUtc)))
      );

      let hours = 0;
      let minutes = 0;
      for (let i = 0; i < totalTimeWorked.length; i++) {
        hours += parseInt(totalTimeWorked[i].hours);
        minutes += parseInt(totalTimeWorked[i].minutes);
      }

      EmployeeList.push({
        name: name,
        totalTimeWorked: { hours, minutes },
      });
    });

    EmployeeList.forEach((employee) => {
      employee.totalTimeWorked.hours += getValueBeforeDecimal(
        employee.totalTimeWorked.minutes
      );

      employee.totalTimeWorked.minutes = Math.round(
        (getValueAfterDecimal(employee.totalTimeWorked.minutes) * 60) / 100
      );
    });

    setEmployeeList(EmployeeList);
  }, [employeesTask]);

  function getValueBeforeDecimal(num) {
    return parseInt((num / 60).toString().split(".")[0]);
  }

  function getValueAfterDecimal(num) {
    return parseInt((num / 60).toFixed(2).toString().split(".")[1]);
  }

  function dateDiffInMs(StarTimeUtc, EndTimeUtc) {
    const date1 = new Date(StarTimeUtc);
    const date2 = new Date(EndTimeUtc);
    return date2 - date1;
  }

  function msToTime(duration) {
    var minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return { hours, minutes };
  }

  return EmployeeList;
}

export default useList;
