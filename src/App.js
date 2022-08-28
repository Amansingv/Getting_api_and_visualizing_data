import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeesTask from "./components/EmployeesTask";
import Employees from "./components/Employees";

import "./App.css";

let url =
  "https://hidden-brushlands-38802.herokuapp.com/https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

function App() {
  const [employeesTask, setEmployeesTask] = useState([]);

  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    setEmployeesTask(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<EmployeesTask employeesTask={employeesTask} />}
        />
        <Route
          path="/workinghours"
          element={<Employees employeesTask={employeesTask} />}
        />
      </Routes>
    </div>
  );
}

export default App;
