import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const defaultData = [
    { id: 1, firstName: "raj", lastName: "lothar", salary: 1000000, age: 30 },
    { id: 2, firstName: "raj", lastName: "smith", salary: 100000, age: 20 },
    { id: 3, firstName: "raj", lastName: "klar", salary: 1000000, age: 20 },
  ];

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("employeeData");
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
    return defaultData;
  });

  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    localStorage.setItem("employeeData", JSON.stringify(data));
  }, [data]);

  const handleClear = () => {
    setFname("");
    setLname("");
    setSalary("");
    setAge("");
    setUpdate(false);
    setId(null);
  };

  const validateInputs = () => {
    if (!fname || !lname || !salary || !age) {
      alert("All fields are required!");
      return false;
    }
    if (isNaN(salary) || isNaN(age)) {
      alert("Salary and Age must be numeric values!");
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validateInputs()) return;

    const newId = data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1;

    const newObj = {
      id: newId,
      firstName: fname,
      lastName: lname,
      salary: Number(salary),
      age: Number(age),
    };

    setData([...data, newObj]);
    handleClear();
  };

  const handleEdit = (id) => {
    const selected = data.find((item) => item.id === id);
    if (!selected) return;

    setUpdate(true);
    setId(id);
    setFname(selected.firstName);
    setLname(selected.lastName);
    setSalary(selected.salary);
    setAge(selected.age);
  };

  const handleUpdate = () => {
    if (!validateInputs()) return;

    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, firstName: fname, lastName: lname, salary: Number(salary), age: Number(age) }
        : item
    );

    setData(updatedData);
    handleClear();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center p-4 app-background">
      <div className="glass-card p-4 shadow w-100" style={{ maxWidth: "1100px" }}>
        <h2 className="text-center mb-4 text-neon">🚀 Employee Manager</h2>

        <div className="row g-3 align-items-end">
          <div className="col-md">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              className="form-control custom-input"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              className="form-control custom-input"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="col-auto">
            {update ? (
              <button className="btn btn-warning neon-btn" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="btn btn-success neon-btn" onClick={handleAdd}>
                Add
              </button>
            )}
          </div>
          <div className="col-auto">
            <button className="btn btn-secondary neon-btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 w-100" style={{ maxWidth: "1100px" }}>
        <table className="table table-dark table-bordered shadow-sm text-center bg-gradient border-neon">
          <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Salary</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-muted">
                  No Employee Data
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.salary}</td>
                  <td>{item.age}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
