import express from "express";
import adminOnly from "../middleware/admin.middleware.js";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    uploadDocument,
    getMyDocuments,
    deleteDocument,
    getAllDocuments
} from "../controllers/document.controller.js";

const router = express.Router();

router.post(
    "/upload",
    protect,
    upload.single("document"),
    uploadDocument
);

router.get(
    "/",
    protect,
    getMyDocuments
);

router.delete(
    "/:id",
    protect,
    deleteDocument
);

router.get(
    "/admin",
    protect,
    adminOnly,
    getAllDocuments
);
export default router;