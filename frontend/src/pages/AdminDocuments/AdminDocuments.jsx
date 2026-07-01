import { useEffect, useState } from "react";
import {
    getAllDocuments,
    deleteDocument
} from "../../services/documentService";
import "./AdminDocuments.css";

const AdminDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDocuments = async () => {
        try {
            const response = await getAllDocuments();
            setDocuments(response.data);
        } catch (err) {
            console.error(err);
            alert("Failed to load documents.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmDelete) return;

        try {
            await deleteDocument(id);

            setDocuments((prev) =>
                prev.filter((doc) => doc._id !== id)
            );

            alert("Document deleted successfully.");
        } catch (err) {
            console.error(err);
            alert("Unable to delete document.");
        }
    };

    if (loading) {
        return <h2>Loading documents...</h2>;
    }

    return (
        <div className="admin-documents-container">

            <h2>Employee Documents</h2>

            {documents.length === 0 ? (
                <p>No documents uploaded.</p>
            ) : (
                <table className="admin-documents-table">

                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Document Type</th>
                            <th>File Name</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {documents.map((doc) => (

                            <tr key={doc._id}>

                                <td>{doc.employee?.employee_id}</td>

                                <td>
                                    {doc.employee?.first_name}{" "}
                                    {doc.employee?.last_name}
                                </td>

                                <td>{doc.documentType}</td>

                                <td>{doc.fileName}</td>

                                <td>
                                    {doc.fileUrl ? (
                                        <a
                                            href={doc.fileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(doc._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>
            )}

        </div>
    );
};

export default AdminDocuments;