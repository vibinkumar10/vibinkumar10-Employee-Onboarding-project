import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadDocument } from "../../services/documentService";
import "./UploadDocument.css";

const UploadDocument = () => {
    const navigate = useNavigate();

    const [documentType, setDocumentType] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!documentType) {
            alert("Please select a document type.");
            return;
        }

        if (!file) {
            alert("Please choose a file.");
            return;
        }

        const formData = new FormData();
        formData.append("document", file);
        formData.append("documentType", documentType);

        try {
            setLoading(true);

            await uploadDocument(formData);

            alert("Document uploaded successfully.");

            navigate("/employee/documents");
        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Upload failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-page">

            <div className="upload-card">

                <h2>Upload Document</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Document Type</label>

                        <select
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                        >
                            <option value="">Select Document</option>
                            <option value="Aadhaar">Aadhaar</option>
                            <option value="PAN">PAN Card</option>
                            <option value="Resume">Resume</option>
                            <option value="Passport">Passport</option>
                            <option value="Driving License">
                                Driving License
                            </option>
                            <option value="Educational Certificate">
                                Educational Certificate
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select File</label>

                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <div className="button-group">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/employee/documents")}
                        >Cancel
                        </button>

                        <button
                            type="submit"
                            className="upload-btn"
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadDocument;