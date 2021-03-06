require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const PORT = 4000;

const app = express();

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

const userRouter = require("./routes/user.routes");
app.use("/", userRouter);

const habitationRouter = require("./routes/habitation.routes");
app.use("/", habitationRouter);

const forumRouter = require("./routes/forum.routes");
app.use("/", forumRouter);

const jobRouter = require("./routes/job.routes");
app.use("/", jobRouter);

const contentsRouter = require("./routes/contents.routes");
app.use("/", contentsRouter);

const commentsRouter = require("./routes/comments.routes");
app.use("/", commentsRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
