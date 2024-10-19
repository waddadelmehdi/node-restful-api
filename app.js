const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("REST API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Amed" },
    { id: 2, name: "Sami" },
  ];
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
  ];
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    name: req.body.name,
  };
  // Normally, you would save this user to a database
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "Amed" },
    { id: 2, name: "Sami" },
  ];
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
  ];
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1); // Remove the user from the array
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:/mydb");

app.get("/users/:id", (req, res) => {
  try {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
