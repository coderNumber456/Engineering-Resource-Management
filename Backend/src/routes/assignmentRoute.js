import { createAssignment , getAllAssignments, updateAssignment ,deleteAssignment } from "../controllers/assignmentController.js";
import { Router } from "express";

const router = Router();

router.route("/").post(createAssignment);
router.route("/").get(getAllAssignments); 
router.route("/:id").delete(deleteAssignment);  
router.route("/:id").put(updateAssignment);  

export default router;