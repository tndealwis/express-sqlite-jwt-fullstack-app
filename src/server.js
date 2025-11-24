import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
