const taskRepository = require("../repositories/taskRepositories");

exports.list = async (req, res) => {
  const tasks = await taskRepository.findAll();
  res.json(tasks);
};

exports.create = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Titulo é obrigatório" });
  }

  const task = await taskRepository.create({ title });
  res.status(201).json(task);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = await taskRepository.update(id, { title, completed });

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.json(task);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const deleted = await taskRepository.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  res.status(204).send();
};
