import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("this is the root");
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
