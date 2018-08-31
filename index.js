const express = require("express");
const actionsHelper = require("./data/helpers/actionModel");
const projectsHelper = require("./data/helpers/projectModel");

const server = express();
server.use(express.json());

// ACTION ROUTES
server.get("/actions/", async (req, res) => {
  try {
    const results = await actionsHelper.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/actions/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "Your ID is not a number" });
  }
  try {
    const results = await actionsHelper.get(req.params.id);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/actions/", async (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Body Invalid" });
  }
  try {
    const results = await actionsHelper.insert(req.body);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/actions/:id", async (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Body Invalid" });
  }
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "ID is not a number" });
  }
  try {
    const results = await actionsHelper.update(req.params.id, req.body);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.delete("/actions/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "Your ID is not a number" });
  }
  try {
    const results = await actionsHelper.remove(Number(req.params.id));
    if (results === 1) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(500).json({ message: "You ID is invalid" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// PROJECT ROUTES
server.get("/projects/", async (req, res) => {
  try {
    const results = await projectsHelper.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/projects/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "Your ID is not a number" });
  }
  try {
    const results = await projectsHelper.get(req.params.id);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/projects/", async (req, res) => {
  if (!req.body.description || !req.body.name) {
    res.status(400).json({ message: "Invalid body" });
    return;
  }
  try {
    const results = await projectsHelper.insert(req.body);
    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/projects/:id", async (req, res) => {
  if (!req.body.description || !req.body.name) {
    res.status(400).json({ message: "Invalid body" });
    return;
  }
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "ID not a number" });
    return;
  }
  try {
    const results = await projectsHelper.update(req.params.id, req.body);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.delete("/projects/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "ID not a number" });
  }
  try {
    const results = await projectsHelper.remove(Number(req.params.id));
    if (results === 1) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(500).json({ message: "Invalid ID for removal" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.listen(9001, () => console.log("PORT WORKING"));
