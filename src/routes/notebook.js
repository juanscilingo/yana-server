import { Router } from "express";
import Notebook from "../db/models/notebook";
import { auth } from "../auth";

const notebookRouter = Router();

notebookRouter.post("/create", async (req, res) => {
  // Validate with joi
  const notebook = await Notebook.create({ ...req.body, author: req.user.id });
  return res.status(200).json(notebook);
});

notebookRouter.get("/:id", async (req, res) => {
  const notebook = await Notebook.findOne({
    _id: req.params.id,
    author: req.user.id
  });

  if (!notebook) res.sendStatus(404);

  return res.status(200).json(notebook);
});

notebookRouter.get("/", async (req, res) => {
  const notebooks = await Notebook.find({ author: req.user.id });
  return res.status(200).json(notebooks);
});

notebookRouter.put("/:id/update", auth, async (req, res) => {
  // Validate with joi
  const notebook = await Notebook.findOneAndUpdate(
    {
      _id: req.params.id,
      author: req.user.id
    },
    { $set: req.body },
    { new: true }
  );

  if (!notebook) res.sendStatus(404);

  return res.status(200).json(notebook);
});

notebookRouter.delete("/:id", auth, async (req, res) => {
  // Validate with joi
  const notebook = await Notebook.findOneAndDelete({
    _id: req.params.id,
    author: req.user.id
  });

  if (!notebook) res.sendStatus(404);

  return res.sendStatus(200);
});

export default notebookRouter;
