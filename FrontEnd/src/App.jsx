import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  // Fetch student data from the backend
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/api/students");
      console.log("Fetched Data:", response.data); // Debug log
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Remove student from the list
  const removeStudent = async (id) => {
    axios
      .delete(`http://127.0.0.1:8080/api/students/${id}`)
      .then(() => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
      })
      .catch((error) => {
        setError(error);
      });
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Student List</h1>
      <div className="card">
        {students.map((students) => (
        <li key={students.id}>
          <span> {students.first_name} {students.last_name} </span>
          <button onClick={() => removeStudent(students.id)}>
            Remove
          </button>
        </li>
        ))} 
      </div>
    </div>
  );
};

export default App;
