import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

//register a new user endpoint /auth/register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  //save the new username hashed password to the database
  try {
    const insertUser = db.prepare(
      `INSERT into users (username,password) VALUES(?,?)`
    );
    const result = insertUser.run(username, hashedPassword);

    //adding a default todo for the user
    const defaultTodo = `Add your first todo`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id,task) VALUES (?,?)`
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    //create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

//login a user endpoint /auth/login
router.post("/login", (req, res) => {});

export default router;
