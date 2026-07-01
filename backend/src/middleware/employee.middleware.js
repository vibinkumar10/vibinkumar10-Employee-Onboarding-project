const employeeOnly = (req, res, next) => {

    if (req.user.role !== "employee") {
        return res.status(403).json({
            message: "Employees only"
        });
    }
    next();
};

export default employeeOnly;