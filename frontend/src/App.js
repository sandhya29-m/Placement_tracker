import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    ctc: "",
    status: "",
    appliedDate: "",
    notes: ""
  });

  const [data, setData] = useState([]);

  const API = "http://127.0.0.1:5000/api/applications";

  // fetch data
  const getData = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, form);
    getData();
  };

  // delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    getData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Placement Tracker</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" onChange={handleChange} />
        <input name="role" placeholder="Role" onChange={handleChange} />
        <input name="ctc" placeholder="CTC" onChange={handleChange} />
        <input name="status" placeholder="Status" onChange={handleChange} />
        <input name="appliedDate" type="date" onChange={handleChange} />
        <input name="notes" placeholder="Notes" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>

      {/* LIST */}
      <h3>Applications</h3>
      {data.map((item) => (
        <div key={item._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <p><b>{item.company}</b> - {item.role}</p>
          <p>Status: {item.status}</p>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;