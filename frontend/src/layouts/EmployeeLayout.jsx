import { Outlet } from "react-router-dom";
import EmployeeNavbar from "../components/EmployeeNavbar.jsx";

function EmployeeLayout() {
    return (
        <div>
            <EmployeeNavbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default EmployeeLayout;