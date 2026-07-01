import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getDocuments,
    deleteDocument
} from "../../services/documentService";
import "./EmployeeDocuments.css";

const EmployeeDocuments = () => {
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDocuments = async () => {
        try {
            const response = await getDocuments();

            console.log(response);

            setDocuments(response.data);
        } catch (err) {
            console.error(err);
            alert("Failed to load documents");
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

            alert("Document deleted successfully");
        } catch (err) {
            console.error(err);
            alert("Unable to delete document");
        }
    };

    if (loading) {
        return (
            <div className="documents-container">
                <h2>Loading Documents...</h2>
            </div>
        );
    }

    return (
        <div className="documents-container">

            <div className="documents-header">
                <h2>My Documents</h2>

                <button
                    className="upload-btn"
                    onClick={() => navigate("/upload-document")}
                >
                    + Upload Document
                </button>
            </div>

            {documents.length === 0 ? (
                <div className="empty-state">
                    <h3>No documents uploaded</h3>
                    <p>Upload your first document.</p>
                </div>
            ) : (
                <table className="admin-documents-table">

                    <thead>
                        <tr>
                            <th>Document Type</th>
                            <th>File Name</th>
                            <th>Preview</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {documents.map((doc) => (
                            <tr key={doc._id}>
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
                                        onClick={() => handleDelete(doc._id)}
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

export default EmployeeDocuments;