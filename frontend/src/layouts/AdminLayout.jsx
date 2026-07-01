import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function AdminLayout() {
    return (
        <>
            <Navbar />
            <div className="page-content">
                <Outlet />
            </div>
        </>
    );
}