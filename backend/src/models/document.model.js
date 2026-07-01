import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
        required: true
    },

    documentType: {
        type: String,
        required: true
    },

    fileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("documents", documentSchema);