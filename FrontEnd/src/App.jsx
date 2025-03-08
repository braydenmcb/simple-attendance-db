import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStudent from './components/addStudent';

const App = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [currentComponent, setCurrentComponent] = useState("StudentList");

  // Fetch student data from the backend
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/api/students");
      console.log("Fetched Data:", response.data); // Debug log
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error);
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
    <div className="header">
      <button onClick={fetchAPI}>Refresh</button>
      <button onClick={() => setCurrentComponent("StudentList")}>Student List</button>
      <button onClick={() => setCurrentComponent("AddStudent")}>Add Student</button>
    </div>

    {/* Conditional Rendering */}
    {currentComponent === "StudentList" ? (
      <div className="card">
        <h1>Student List</h1>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <span>
                {student.first_name} {student.last_name}
              </span>
              <button onClick={() => removeStudent(student.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <AddStudent fetchAPI={fetchAPI} />
    )}
  </div>
);
};

export default App;
