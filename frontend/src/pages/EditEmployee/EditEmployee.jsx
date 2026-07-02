import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api.js";
import "./EditEmployee.css";

export default function EditEmployee() {

    const { id } = useParams();

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

    useEffect(() => {

        loadEmployee();

    }, []);

    const loadEmployee = async () => {

        try {

            const res = await API.get(`/employees/${id}`);

            setEmployee(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setEmployee({

            ...employee,

            [e.target.name]: e.target.value

        });

    };

    const updateEmployee = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/employees/${id}`, employee);

            alert("Employee Updated Successfully");

            navigate("/employees");

        } catch (err) {

            console.log(err);

            alert("Update Failed");

        }

    };

    return (

        <div className="edit-container">

            <h1>Edit Employee</h1>

            <form onSubmit={updateEmployee}>

                <input
                    name="employee_id"
                    value={employee.employee_id}
                    onChange={handleChange}
                    placeholder="Employee ID"
                />

                <input
                    name="first_name"
                    value={employee.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                />

                <input
                    name="last_name"
                    value={employee.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                />

                <input
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder="Email"
                />

                <input
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                />

                <input
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    placeholder="Department"
                />

                <input
                    name="title"
                    value={employee.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <button>
                    Update Employee
                </button>

            </form>

        </div>

    );

}