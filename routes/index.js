const projectsRouter = require("./projects");
const usersRouter = require("./users");

const setupRoutes = (app) => {
  // Project routes
  app.use("/api/projects", projectsRouter);
  // User routes
  // TODO
  app.use("/api/user", usersRouter);
};

module.exports = {
  setupRoutes,
};
