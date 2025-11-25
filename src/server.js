import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todosRoutes from "./routes/todoRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

//get the file path of the URL of the current module
const __filename = fileURLToPath(import.meta.url);

//get the directory name from the file path
const __dirname = dirname(__filename);

//middleware
app.use(express.json());

//making sure all static files in public folder is served using express middleware
app.use(express.static(path.join(__dirname, "../public")));

//serving up the html file from public folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//routes
app.use("/", authRoutes);
app.use("/", todosRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
