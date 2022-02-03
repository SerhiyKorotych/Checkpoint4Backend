const projectsRouter = require("express").Router();
const Project = require("../models/projects");

projectsRouter.get("/:id", (req, res) => {
  Project.findOne(req.params.id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).send("Project not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error retrieving project from database");
    });
});

projectsRouter.post("/", (req, res) => {
  const error = Project.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    Project.create(req.body)
      .then((createdProject) => {
        res.status(201).json(createdProject);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the Project");
      });
  }
});

projectsRouter.put("/:id", (req, res) => {
  let existingProject = null;
  let validationErrors = null;
  Project.findOne(req.params.id)
    .then((project) => {
      existingProject = project;
      if (!existingProject) return Promise.reject("RECORD_NOT_FOUND");
      validationErrors = Project.validate(req.body, false);
      if (validationErrors) return Promise.reject("INVALID_DATA");
      return Project.update(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingProject, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === "RECORD_NOT_FOUND")
        res.status(404).send(`Project with id ${req.params.id} not found.`);
      else if (err === "INVALID_DATA")
        res.status(422).json({ validationErrors: validationErrors.details });
      else res.status(500).send("Error updating a Project.");
    });
});

projectsRouter.delete("/:id", (req, res) => {
  Project.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send("Project deleted!");
      else res.status(404).send("Project not found");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting a Project");
    });
});

module.exports = projectsRouter;
