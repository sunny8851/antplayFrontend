import React from "react";
import SimpleTable from "./components/Home";

const App = () => {
  const sampleData = [
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Smith", age: 30, city: "San Francisco" },
    // Add more rows as needed
  ];

  const tableColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "city", label: "City" },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Simple Table Example</h1>
      <SimpleTable data={sampleData} columns={tableColumns} />
    </div>
  );
};

export default App;
