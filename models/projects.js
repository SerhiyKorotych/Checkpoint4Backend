const connection = require("../db-config");
const Joi = require("joi");

const db = connection.promise();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return Joi.object({
    projectName: Joi.string().max(255).presence(presence),
    projectDescription: Joi.string().max(255).presence(presence),
    tools: Joi.string().max(255).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const findOne = (id) => {
  return db
    .query("SELECT * FROM projects WHERE id = ?", [id])
    .then(([results]) => results[0]);
};

const create = ({ projectName, projectDescription, tools }) => {
  return db
    .query(
      "INSERT INTO projects (projectName, projectDescription, tools) VALUES (?, ?, ?)",
      [projectName, projectDescription, tools]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { id, projectName, projectDescription, tools };
    });
};

const update = (id, newAttributes) => {
  return db.query("UPDATE projects SET ? WHERE id = ?", [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query("DELETE FROM projects WHERE id = ?", [id])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = {
  findOne,
  validate,
  create,
  update,
  destroy,
};
