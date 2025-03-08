import express from "express";
import { 
    addProject, 
    getAllProjects, 
    getProjectById, 
    updateProject, 
    deleteProject,
    getProjectManager
} from "../controllers/projectController.js";
import { authenticateToken,checkIsAdmin,checkIsProjectMember } from "../middlewares/checkPermisson.js";

const router = express.Router();

router.post("/",authenticateToken,checkIsAdmin, addProject);
router.get("/", authenticateToken,checkIsAdmin,getAllProjects);
router.get("/:id",authenticateToken,checkIsProjectMember, getProjectById);
router.put("/:id",authenticateToken,checkIsAdmin, updateProject);
router.delete("/:id",authenticateToken,checkIsAdmin, deleteProject);
router.get("/:id/manager",authenticateToken, getProjectManager);

export default router;
