const taskRepository = require("../repositories/taskRepositories");

exports.list = async (req, res) => {
  const tasks = await taskRepository.findAll();
  res.json(tasks);
};

exports.create = async (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "Titulo e data são obrigatórios" });
  }

  const task = await taskRepository.create({ title, date });
  res.status(201).json(task);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, date, completed } = req.body;

  const task = await taskRepository.update(id, { title, date, completed });

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
