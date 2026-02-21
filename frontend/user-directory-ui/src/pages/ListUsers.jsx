import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";
import "../styles/table.css";
import "../styles/app.css";

export default function ListUsers({ toast }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const data = await getUsers();
        if (mounted) setUsers(data);
      } catch (e) {
        if (mounted) setErr(e.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container page">
      <h1 className="title">Users</h1>

      {loading && (
        <div className="card">
          <div className="spinner" aria-label="Loading"></div>
          <div className="muted">Loading users…</div>
        </div>
      )}

      {!loading && err && (
        <div className="card error">
          <div className="error-title">Failed to load</div>
          <div className="muted">{err}</div>
        </div>
      )}

      {!loading && !err && users.length === 0 && (
        <div className="card">
          <div className="muted">No users found. Add your first user.</div>
        </div>
      )}

      {!loading && !err && users.length > 0 && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.age}</td>
                  <td>{u.city}</td>
                  <td>{u.state}</td>
                  <td>{u.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}