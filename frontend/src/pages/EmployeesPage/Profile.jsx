import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./Profile.css";

export default function Profile() {

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await API.get("/api/employees/profile/me");

            setEmployee(res.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    if (!employee) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h2>My Profile</h2>

                <div className="row">
                    <label>Employee ID</label>
                    <p>{employee.employee_id}</p>
                </div>

                <div className="row">
                    <label>Name</label>
                    <p>{employee.first_name} {employee.last_name}</p>
                </div>

                <div className="row">
                    <label>Email</label>
                    <p>{employee.email}</p>
                </div>

                <div className="row">
                    <label>Phone</label>
                    <p>{employee.phone}</p>
                </div>

                <div className="row">
                    <label>Department</label>
                    <p>{employee.department}</p>
                </div>

                <div className="row">
                    <label>Designation</label>
                    <p>{employee.title}</p>
                </div>

                <div className="row">
                    <label>Status</label>
                    <p>{employee.status}</p>
                </div>

                <Link
                    to="/employee/profile/edit"
                    className="edit-btn"
                >
                    Edit Profile
                </Link>

            </div>

        </div>

    );

}