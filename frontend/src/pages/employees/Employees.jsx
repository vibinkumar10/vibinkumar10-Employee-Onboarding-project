import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Employees.css";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Employees() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        try {
            const res = await API.get("/employees");
            setEmployees(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteEmployee = async (id) => {

        if (!window.confirm("Delete this employee?")) return;
        try {
            await API.delete(`/employees/${id}`);
            getEmployees();
        } catch (err) {
            console.log(err);
        }
    };

    const filteredEmployees = employees.filter((emp) => {
        const fullName =
            `${emp.first_name} ${emp.last_name}`.toLowerCase();

        return (
            fullName.includes(search.toLowerCase()) ||
            emp.department.toLowerCase().includes(search.toLowerCase())
        );

    });

    return (
        <>
            {/* <Navbar /> */}
            <div className="employees-page">
                <div className="top">
                    <div>
                        <h1>Employees</h1>
                        <p>{employees.length} Total</p>
                    </div>
                    <button
                        onClick={() => navigate("/employees/add")}
                    >
                        + Add
                    </button>
                </div>
                <input
                    placeholder="Search by name or department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="employee-list">
                    {
                        filteredEmployees.map(emp => (
                            <div
                                key={emp._id}
                                className="employee-card"
                            >
                                <div>
                                    <div className="avatar">
                                        {emp.first_name[0]}
                                        {emp.last_name[0]}
                                    </div>
                                </div>
                                <div className="employee-info">
                                    <h3>
                                        {emp.first_name} {emp.last_name}
                                    </h3>
                                    <p>
                                        {emp.department}
                                    </p>
                                </div>
                                <div className="status">
                                    <span
                                        className={emp.status}
                                    >
                                        {emp.status}
                                    </span>
                                </div>
                                <div className="actions">
                                    <div className="btns">
                                        <button
                                            className="buttons"
                                            onClick={() => navigate(`/employees/edit/${emp._id}`)}
                                        >
                                           <MdModeEdit className="svg"/>
                                        </button>

                                        <button
                                            className="buttons"
                                            onClick={() => deleteEmployee(emp._id)}
                                        >
                                           <MdDelete className="svg"/>
                                        </button>
                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </>
    );

}