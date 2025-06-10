import { createProject , getAllProjects, updateProject ,getProject } from "../controllers/projectControllers.js";
import { Router } from "express";

const router = Router();

router.route("/").post(createProject);
router.route("/:id").put(updateProject);     
router.route("/:id").get(getProject);
router.route("/").get(getAllProjects);

export default router;