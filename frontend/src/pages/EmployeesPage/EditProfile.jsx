import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./EditProfile.css";

export default function EditProfile() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        first_name: "",
        last_name: "",
        phone: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        const res = await API.get("/employees/profile/me");

        setForm({

            first_name: res.data.data.first_name,
            last_name: res.data.data.last_name,
            phone: res.data.data.phone

        });

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.put("/employees/profile/me", form);
        alert("Profile Updated");
        navigate("/employee/profile");
    };

    return (

        <div className="edit-page">

            <form
                onSubmit={handleSubmit}
                className="edit-card"
            >

                <h2>Edit Profile</h2>

                <div className="label-field">
                    <label htmlFor="first_name">
                        Firstname</label>
                    <input
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="label-field">
                    <label htmlFor="last_name">
                        Lastname</label>
                    <input
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="label-field">
                    <label htmlFor="phone">
                        Phone</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <button>

                    Save Changes

                </button>

            </form>

        </div>

    );

}