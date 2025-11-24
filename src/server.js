import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8000;

//get the file path of the URL of the current module
const __filename = fileURLToPath(import.meta.url);

//get the direcotory name from the file path
const __dirname = dirname(__filename);

//making sure all static files in public folder is served using express middleware
app.use(express.static(path.join(__dirname, "../public")));

//serving up the html file from public folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
