import api from "./api";

export const uploadDocument = async (formData) => {
    const response = await api.post("/documents/upload", formData);
    return response.data;
};

export const getDocuments = async () => {
    const response = await api.get("/api/documents");
    return response.data;
};

export const deleteDocument = async (id) => {
    const response = await api.delete(`/api/documents/${id}`);
    return response.data;
};

export const getAllDocuments = async () => {
    const response = await api.get("/api/documents/admin");
    return response.data;
};