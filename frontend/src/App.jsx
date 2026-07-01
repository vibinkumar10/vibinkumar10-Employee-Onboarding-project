import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/employees/Employees";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import Approvals from "./pages/Approvals/Approvals";
import AdminDocuments from "./pages/AdminDocuments/AdminDocuments";

import EmployeeDashboard from "./pages/EmployeesPage/Dashboard";
import Profile from "./pages/EmployeesPage/Profile";
import EditProfile from "./pages/EmployeesPage/EditProfile";
import EmployeeDocuments from "./pages/EmployeeDocuments/EmployeeDocuments";
import UploadDocument from "./pages/UploadDocument/UploadDocument";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                element={
                    <ProtectedRoute role="admin">
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/employees" element={<Employees />} />

                <Route path="/employees/add" element={<AddEmployee />} />

                <Route
                    path="/employees/edit/:id"
                    element={<EditEmployee />}
                />

                <Route
                    path="/employees/approvals"
                    element={<Approvals />}
                />

                <Route
                    path="/admin/documents"
                    element={<AdminDocuments />}
                />
            </Route>

            <Route
                element={
                    <ProtectedRoute role="employee">
                        <EmployeeLayout />
                    </ProtectedRoute>
                }
            >
                {/* <Route
                    path="/employee/dashboard"
                    element={<EmployeeDashboard />}
                /> */}

                <Route
                    path="/employee/profile"
                    element={<Profile />}
                />

                <Route
                    path="/employee/profile/edit"
                    element={<EditProfile />}
                />

                <Route
                    path="/employee/documents"
                    element={<EmployeeDocuments />}
                />

                <Route
                    path="/upload-document"
                    element={<UploadDocument />}
                />
            </Route>

            <Route
                path="*"
                element={
                    <h1 style={{ textAlign: "center" }}>
                        404 Page Not Found
                    </h1>
                }
            />

        </Routes>
    );
}

export default App;