import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://userapp6.onrender.com";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "student" });

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  const handleAdd = async () => {
    if (!form.name || !form.email) return alert("All fields required");
    const res = await axios.post(`${API}/adduser`, form);
    setUsers([...users, res.data]);
    setForm({ name: "", email: "", role: "student" });
  };

  const handleDelete = async (email) => {
    await axios.delete(`${API}/removeuser/${email}`);
    setUsers(users.filter(u => u.email !== email));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="title">MY USER APP</h1>
      <div className="form">
        <input
          placeholder="Enter Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Enter Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option>student</option>
          <option>teacher</option>
        </select>
        <button onClick={handleAdd}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th><th>Email</th><th>Name</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.email}>
              <td>{i + 1}</td>
              <td>{u.email}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(u.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        Design and Developed by myself  
      </footer>
    </div>
  );
}

export default App;