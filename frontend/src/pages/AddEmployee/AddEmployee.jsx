import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import "./AddEmployee.css";

export default function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        department: "",
        title: ""
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await API.post("/api/employees", employee);
            alert("Employee Added Successfully");
            navigate("/employees");
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="add-employee">
            <div className="form-card">
                <h1>Add Employee</h1>
                <p>Enter employee details</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Employee ID</label>
                        <input
                            type="text"
                            name="employee_id"
                            value={employee.employee_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={employee.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={employee.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={employee.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={employee.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="submit-btn">
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
}