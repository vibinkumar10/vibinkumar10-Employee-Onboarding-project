import { useEffect, useState } from "react";
import API from "../../services/api.js";
import "./Approvals.css";

export default function Approvals() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetchPendingEmployees();
    }, []);
    const fetchPendingEmployees = async () => {

        try {
            const res = await API.get("/employees");
            const pending = res.data.data.filter(
                emp => emp.status === "Pending"
            );
            setEmployees(pending);
        } catch (err) {
            console.log(err);
        }
    };

    const approveEmployee = async (id) => {
        try {
            const res = await API.patch(`/api/employees/${id}/approve`);

            alert(
                `Employee Approved`
            );
            fetchPendingEmployees();
        } catch (err) {
            console.log(err);
        }
    }
    const rejectEmployee = async (id) => {
        try {
            await API.patch(`/api/employees/${id}/reject`);
            fetchPendingEmployees();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="approval-container">
            <div className="approval-header">
                <h1>Pending Employee Approvals</h1>
                <p>{employees.length} Pending Employees</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        employees.map(emp => {
                            return (
                                <tr key={emp._id}>
                                    <td>{emp.employee_id}</td>
                                    <td>
                                        {emp.first_name} {emp.last_name}
                                    </td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.title}</td>
                                    <td>
                                        <button
                                            className="approve-btn"
                                            onClick={() => approveEmployee(emp._id)}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() => rejectEmployee(emp._id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}