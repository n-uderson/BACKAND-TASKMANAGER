const taskRepository = require("../repositories/taskRepositories");

exports.list = async (req, res) => {
  const userId = req.user.id;
  const tasks = await taskRepository.findByUser(userId);
  res.json(tasks);
};

exports.create = async (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "Titulo e data são obrigatórios" });
  }
  const userId = req.user.id;

  const task = await taskRepository.create({
    title,
    date,
    userId,
  });
  res.status(201).json(task);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, date, completed } = req.body;

  const userId = req.user.id;

  const task = await taskRepository.update(id, userId, {
    title,
    date,
    completed,
  });

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.json(task);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const deleted = await taskRepository.remove(id, userId);

  if (!deleted) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  res.status(204).send();
};
