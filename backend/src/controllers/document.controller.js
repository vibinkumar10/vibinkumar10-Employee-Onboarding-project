import Document from "../models/document.model.js";
import Employee from "../models/employee.model.js";
import supabase from "../config/supabase.js";

export const uploadDocument = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);
        const employee = await Employee.findById(req.user.employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please select a file"
            });
        }

        const { documentType } = req.body;

        const folderName =
            `${employee.employee_id}_${employee.first_name}_${employee.last_name}`;

        const filePath =
            `${folderName}/${Date.now()}-${req.file.originalname}`;

        const { error } = await supabase.storage
            .from("employee-docs")
            .upload(filePath, req.file.buffer);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        await Document.create({
            employee: employee._id,
            documentType,
            fileName: req.file.originalname,
            filePath
        });

        res.status(201).json({
            message: "Document uploaded successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};

export const getMyDocuments = async (req, res) => {
    try {

        const documents = await Document.find({
            employee: req.user.employeeId
        });

        const documentsWithUrls = await Promise.all(
            documents.map(async (doc) => {

                const { data, error } = await supabase.storage
                    .from("employee-docs")
                    .createSignedUrl(doc.filePath, 60 * 60);

                return {
                    _id: doc._id,
                    employee: doc.employee,
                    documentType: doc.documentType,
                    fileName: doc.fileName,
                    filePath: doc.filePath,
                    fileUrl: error ? null : data.signedUrl
                };
            })
        );

        res.status(200).json({
            data: documentsWithUrls
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};

export const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        const { error } = await supabase.storage
            .from("employee-docs")
            .remove([document.filePath]);

        if (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        await Document.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Document deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
};

export const getAllDocuments = async (req, res) => {
    try {

        const documents = await Document.find()
            .populate(
                "employee",
                "employee_id first_name last_name"
            );

        const data = await Promise.all(
            documents.map(async (doc) => {

                const { data: signed } =
                    await supabase.storage
                        .from("employee-docs")
                        .createSignedUrl(
                            doc.filePath,
                            3600
                        );

                return {
                    _id: doc._id,
                    employee: doc.employee,
                    documentType: doc.documentType,
                    fileName: doc.fileName,
                    fileUrl: signed?.signedUrl
                };
            })
        );

        res.json({
            data
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};