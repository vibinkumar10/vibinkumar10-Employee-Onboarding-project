import Employee from "../models/employee.model.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const addEmployee = async (req, res) => {
    try {
        const {
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            department,
            title
        } = req.body;
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({
                message: "Employee already exists"
            });
        }
        const employee = await Employee.create({
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            department,
            title
        });
        const tempPassword = "Welcome@123";
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        await User.create({
            email,
            password: hashedPassword,
            role: "employee",
            employee: employee._id
        });
        res.status(201).json({
            message: "Employee Added Successfully",
            temporaryPassword: tempPassword,
            employee
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        if (employees.length === 0) {
            return res.status(404).json({ message: 'no data found' })
        }
        res.status(200).json({ data: employees })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await Employee.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'no User found' })
        }
        res.json({ data: user })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const updateAnEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const {
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            department,
            title,
        } = req.body
        const updatedUser = await Employee.findByIdAndUpdate(
            id,
            {
                employee_id,
                first_name,
                last_name,
                email,
                phone,
                department,
                title,
            },
            { returnDocument: 'after' }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: 'no User found' })
        }
        res.status(200).json({ message: `updated ${id}`, data: updatedUser })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const user = await Employee.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: 'no User found' })
        }
        res.status(200).json({ message: `Deleted ${user.first_name} successfully` })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const approveEmployee = async (req, res) => {

    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                status: "Approved"
            },

            {
                new: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee Approved Successfully",
            data: employee
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

};

export const rejectEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                status: "Rejected"
            },
            {
                new: true
            }
        );
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }
        res.status(200).json({
            message: "Employee Rejected",
            data: employee
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

export const getMyProfile = async (req, res) => {
    try {
        const employee = await Employee.findById(req.user.employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }
        res.status(200).json({
            data: employee
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

export const updateMyProfile = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            phone,
            department,
            title
        } = req.body;
        const employee = await Employee.findByIdAndUpdate(
            req.user.employeeId,
            {
                first_name,
                last_name,
                phone,
                department,
                title
            },
            {
                new: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }
        res.status(200).json({
            message: "Profile Updated Successfully",
            data: employee
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};