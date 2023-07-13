const express = require("express");
const morgan = require("morgan");

const postsRouter = require("./routes/posts.router");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

/** (구현) **/
app.use("/", postsRouter);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`);
});
