import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FiBell, FiLogOut } from "react-icons/fi";

export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2>CDS</h2>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/employees"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Employees
                </NavLink>

                <NavLink
                    to="/employees/approvals"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Approvals
                </NavLink>

                <NavLink
                    to="/admin/documents"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Documents
                </NavLink>
            </div>
            <div className="navbar-right">
                <div className="admin">
                    <div className="avatar">
                        A
                    </div>
                    <span>Admin</span>
                </div>
                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <FiLogOut />
                    Logout
                </button>
            </div>
        </nav>
    );

}