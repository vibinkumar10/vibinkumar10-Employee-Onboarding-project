import express from "express";

import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";
import employeeOnly from "../middleware/employee.middleware.js";

import {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee,
    updateAnEmployee,
    approveEmployee,
    rejectEmployee,
    getMyProfile,
    updateMyProfile
} from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", protect, adminOnly, addEmployee);
router.get("/", protect, adminOnly, getAllEmployees);
router.get("/:id", protect, adminOnly, getEmployeeById);
router.put("/:id", protect, adminOnly, updateAnEmployee);
router.delete("/:id", protect, adminOnly, deleteEmployee);
router.patch("/:id/approve", protect, adminOnly, approveEmployee);
router.patch("/:id/reject", protect, adminOnly, rejectEmployee);

router.get("/profile/me", protect, employeeOnly, getMyProfile);
router.put("/profile/me", protect, employeeOnly, updateMyProfile);

export default router;