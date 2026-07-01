import { NavLink, useNavigate } from "react-router-dom";

function EmployeeNavbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2>Employee Page</h2>
                <NavLink
                    to="/employee/profile"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Profile
                </NavLink>

                <NavLink
                    to="/employee/documents"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Documents
                </NavLink>

            </div>

            <div className="navbar-right">
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default EmployeeNavbar;