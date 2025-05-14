const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

exports.signup = async (req, res) => {
  console.log('Request body:', req.body);
  const { name, email, password } = req.body;
  const existingUser = await userModel.findByEmail(email);
  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create(name, email, hashedPassword);

  res.status(201).json({ message: "User created successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findByEmail(email);
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token });
};
