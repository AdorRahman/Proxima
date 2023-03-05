const express = require("express");
const {
  postProject,
  getALLPRoject,
  getSingleProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

const requireAuth = require("../middlewares/requireAuth");

//router
const router = express.Router();

router.use(requireAuth);

//routes
router.get("/", getALLPRoject);

//GET a single project
router.get("/:id", getSingleProject);

//post
router.post("/", postProject);

//delete
router.delete("/:id", deleteProject);
//update

router.patch("/:id", updateProject);

module.exports = router;
