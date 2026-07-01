import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";

export default function Dashboard() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        getEmployees();

    }, []);


    const total = employees.length;

    const active = employees.filter(
        emp => emp.status === "Active"
    ).length;

    const onboarding = employees.filter(
        emp => emp.status === "Pending"
    ).length;

    const getEmployees = async () => {
        try {
            const res = await API.get("/employees");

            console.log(res.data);

            setEmployees(res.data.data);

        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <>
            {/* <Navbar /> */}

            <div className="dashboard">

                <h1>Dashboard</h1>

                <p>Overview</p>

                <div className="cards">

                    <div className="card">

                        <h2>{total}</h2>

                        <span>Total Employees</span>

                    </div>

                    {/* <div className="card">

                        <h2>{active}</h2>

                        <span>Active</span>

                    </div> */}

                    <div className="card">

                        <h2>{onboarding}</h2>

                        <span>Onboarding</span>

                    </div>

                    {/* <div className="card">

                        <h2>0</h2>

                        <span>Docs To Review</span>

                    </div> */}

                </div>

                <div className="employee-table">

                    <h3>Employees</h3>

                    {
                        employees.map(emp => (

                            <div
                                className="employee-row"
                                key={emp._id}
                            >

                                <div>

                                    <strong>
                                        {emp.first_name} {emp.last_name}
                                    </strong>

                                    <p>{emp.department}</p>

                                </div>

                                <span className={emp.status}>
                                    {emp.status}
                                </span>

                            </div>

                        ))
                    }

                </div>

            </div>

        </>
    );
}