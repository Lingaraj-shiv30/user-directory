import { NavLink } from "react-router-dom";
import "../styles/app.css";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand">User Directory</div>
        <nav className="nav">
          <NavLink className="navlink" to="/list">List</NavLink>
          <NavLink className="navlink" to="/add">Add</NavLink>
        </nav>
      </div>
    </header>
  );
}