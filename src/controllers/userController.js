const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepositories = require("../repositories/userRepositories");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const existingUser = await userRepositories.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepositories.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = await userRepositories.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    const { password: _, ...userWithoutPassword } = user;
    return res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
